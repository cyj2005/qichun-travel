using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace PointCloudDenoise
{
    public sealed class PointCloudProcessor
    {
        public const double GridSize = 3.0;
        public const int NeighborCount = 6;

        public ProcessingResult Process(string filePath)
        {
            ProcessingResult result = new ProcessingResult();
            int index = 1;
            foreach (string line in File.ReadLines(filePath))
            {
                string trimmed = line.Trim();
                if (trimmed.Length == 0) continue;
                string[] parts = trimmed.Split((char[])null, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length < 3) throw new InvalidDataException("第 " + index + " 行不是三个坐标值。");
                double x, y, z;
                if (!double.TryParse(parts[0], NumberStyles.Float, CultureInfo.InvariantCulture, out x) ||
                    !double.TryParse(parts[1], NumberStyles.Float, CultureInfo.InvariantCulture, out y) ||
                    !double.TryParse(parts[2], NumberStyles.Float, CultureInfo.InvariantCulture, out z))
                    throw new InvalidDataException("第 " + index + " 行包含无效坐标。");
                result.Points.Add(new Point3D { Index = index++, X = x, Y = y, Z = z });
            }
            if (result.Points.Count <= NeighborCount) throw new InvalidDataException("点数必须大于 " + NeighborCount + "。");

            result.XMin = result.Points.Min(p => p.X); result.XMax = result.Points.Max(p => p.X);
            result.YMin = result.Points.Min(p => p.Y); result.YMax = result.Points.Max(p => p.Y);
            result.ZMin = result.Points.Min(p => p.Z); result.ZMax = result.Points.Max(p => p.Z);
            result.XMaxGrid = FillGridMaximum(result.XMin, result.XMax);
            result.YMaxGrid = FillGridMaximum(result.YMin, result.YMax);
            result.ZMaxGrid = FillGridMaximum(result.ZMin, result.ZMax);

            Dictionary<GridKey, List<Point3D>> grid = new Dictionary<GridKey, List<Point3D>>();
            foreach (Point3D p in result.Points)
            {
                p.I = (int)Math.Floor((p.X - result.XMin) / GridSize);
                p.J = (int)Math.Floor((p.Y - result.YMin) / GridSize);
                p.K = (int)Math.Floor((p.Z - result.ZMin) / GridSize);
                GridKey key = new GridKey(p.I, p.J, p.K);
                List<Point3D> cell;
                if (!grid.TryGetValue(key, out cell)) { cell = new List<Point3D>(); grid.Add(key, cell); }
                cell.Add(p);
            }
            List<Point3D> origin;
            result.Grid000Count = grid.TryGetValue(new GridKey(0, 0, 0), out origin) ? origin.Count : 0;

            foreach (Point3D p in result.Points)
            {
                List<DistanceItem> candidates = new List<DistanceItem>();
                for (int di = -1; di <= 1; di++)
                    for (int dj = -1; dj <= 1; dj++)
                        for (int dk = -1; dk <= 1; dk++)
                        {
                            List<Point3D> cell;
                            if (!grid.TryGetValue(new GridKey(p.I + di, p.J + dj, p.K + dk), out cell)) continue;
                            foreach (Point3D candidate in cell)
                                if (candidate.Index != p.Index) candidates.Add(new DistanceItem(candidate.Index, Distance(p, candidate)));
                        }
                // 极少数离群点在 27 邻域内可能不足 6 点。保留 27 邻域作为首选，
                // 并以全局最近点补足到 k 个，保证每个点均可完成统计。
                if (candidates.Count < NeighborCount)
                {
                    HashSet<int> existing = new HashSet<int>(candidates.Select(x => x.Index));
                    foreach (Point3D candidate in result.Points)
                        if (candidate.Index != p.Index && !existing.Contains(candidate.Index))
                            candidates.Add(new DistanceItem(candidate.Index, Distance(p, candidate)));
                }
                candidates.Sort();
                for (int n = 0; n < NeighborCount; n++) p.Neighbors.Add(candidates[n].Index);
                double[] distances = candidates.Take(NeighborCount).Select(x => x.Value).ToArray();
                p.MeanDistance = distances.Average();
                p.DistanceStdDev = PopulationStdDev(distances, p.MeanDistance);
            }
            result.GlobalMean = result.Points.Average(p => p.MeanDistance);
            result.GlobalStdDev = PopulationStdDev(result.Points.Select(p => p.MeanDistance), result.GlobalMean);
            foreach (Point3D p in result.Points) p.IsNoise = p.MeanDistance > result.GlobalMean + 2 * result.GlobalStdDev;
            result.NoiseCount = result.Points.Count(p => p.IsNoise);
            return result;
        }

        private static double FillGridMaximum(double min, double max)
        {
            return min + Math.Ceiling((max - min) / GridSize) * GridSize;
        }
        private static double Distance(Point3D a, Point3D b)
        {
            double dx = a.X - b.X, dy = a.Y - b.Y, dz = a.Z - b.Z;
            return Math.Sqrt(dx * dx + dy * dy + dz * dz);
        }
        private static double PopulationStdDev(IEnumerable<double> values, double mean)
        {
            double[] data = values.ToArray();
            return Math.Sqrt(data.Sum(v => (v - mean) * (v - mean)) / data.Length);
        }
        private sealed class DistanceItem : IComparable<DistanceItem>
        {
            public readonly int Index; public readonly double Value;
            public DistanceItem(int index, double value) { Index = index; Value = value; }
            public int CompareTo(DistanceItem other) { int c = Value.CompareTo(other.Value); return c != 0 ? c : Index.CompareTo(other.Index); }
        }
    }
}

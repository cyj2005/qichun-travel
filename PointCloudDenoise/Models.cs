using System;
using System.Collections.Generic;

namespace PointCloudDenoise
{
    public sealed class Point3D
    {
        public int Index;
        public double X;
        public double Y;
        public double Z;
        public int I;
        public int J;
        public int K;
        public List<int> Neighbors = new List<int>();
        public double MeanDistance;
        public double DistanceStdDev;
        public bool IsNoise;
    }

    internal struct GridKey : IEquatable<GridKey>
    {
        public readonly int I, J, K;
        public GridKey(int i, int j, int k) { I = i; J = j; K = k; }
        public bool Equals(GridKey other) { return I == other.I && J == other.J && K == other.K; }
        public override bool Equals(object obj) { return obj is GridKey && Equals((GridKey)obj); }
        public override int GetHashCode() { unchecked { return ((I * 397) ^ J) * 397 ^ K; } }
    }

    public sealed class ProcessingResult
    {
        public List<Point3D> Points = new List<Point3D>();
        public double XMin, XMax, YMin, YMax, ZMin, ZMax;
        public double XMaxGrid, YMaxGrid, ZMaxGrid;
        public int Grid000Count;
        public double GlobalMean;
        public double GlobalStdDev;
        public int NoiseCount;
        public int RetainedCount { get { return Points.Count - NoiseCount; } }
    }
}

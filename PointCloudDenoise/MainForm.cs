using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace PointCloudDenoise
{
    public sealed class MainForm : Form
    {
        private readonly TextBox _pathBox = new TextBox();
        private readonly NumericUpDown _thresholdBox = new NumericUpDown();
        private readonly DataGridView _grid = new DataGridView();
        private readonly RichTextBox _reportBox = new RichTextBox();
        private readonly StatusStrip _status = new StatusStrip();
        private readonly ToolStripStatusLabel _statusText = new ToolStripStatusLabel("请选择 point.txt 后开始处理。");
        private ProcessingResult _result;

        public MainForm()
        {
            Text = "基于统计滤波的点云去噪";
            StartPosition = FormStartPosition.CenterScreen;
            MinimumSize = new Size(1000, 650);
            Size = new Size(1180, 760);
            BuildInterface();
        }

        private void BuildInterface()
        {
            MenuStrip menu = new MenuStrip();
            ToolStripMenuItem file = new ToolStripMenuItem("文件(&F)");
            file.DropDownItems.Add("打开点云文件(&O)", null, delegate { SelectFile(); });
            file.DropDownItems.Add("保存计算报告(&S)", null, delegate { SaveReport(); });
            file.DropDownItems.Add(new ToolStripSeparator());
            file.DropDownItems.Add("退出(&X)", null, delegate { Close(); });
            ToolStripMenuItem help = new ToolStripMenuItem("帮助(&H)");
            help.DropDownItems.Add("算法说明", null, delegate { MessageBox.Show("格网边长为 3，搜索当前格网及 26 个相邻格网；\n每点取距离最近的 6 个非自身点，按 uᵢ > μ + 2σ 判为噪声。", "算法说明"); });
            menu.Items.Add(file); menu.Items.Add(help); MainMenuStrip = menu; Controls.Add(menu);

            ToolStrip tools = new ToolStrip { Dock = DockStyle.Top };
            tools.Items.Add("打开", null, delegate { SelectFile(); });
            tools.Items.Add("开始计算", null, delegate { ProcessFile(); });
            tools.Items.Add("保存报告", null, delegate { SaveReport(); });
            Controls.Add(tools);

            Panel top = new Panel { Dock = DockStyle.Top, Height = 74, Padding = new Padding(10, 8, 10, 8) };
            Label fileLabel = new Label { Text = "点云文件：", AutoSize = true, Location = new Point(10, 14) };
            _pathBox.Location = new Point(76, 10); _pathBox.Width = 690; _pathBox.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            Button browse = new Button { Text = "浏览...", Location = new Point(775, 8), Width = 75, Anchor = AnchorStyles.Top | AnchorStyles.Right };
            browse.Click += delegate { SelectFile(); };
            Button run = new Button { Text = "开始去噪", Location = new Point(860, 8), Width = 95, Anchor = AnchorStyles.Top | AnchorStyles.Right };
            run.Click += delegate { ProcessFile(); };
            Label parameter = new Label { Text = "判定系数：", AutoSize = true, Location = new Point(10, 45) };
            _thresholdBox.Location = new Point(76, 41); _thresholdBox.Width = 65; _thresholdBox.DecimalPlaces = 1; _thresholdBox.Minimum = 0.1M; _thresholdBox.Maximum = 10M; _thresholdBox.Value = 2M;
            Label tip = new Label { Text = "固定参数：格网边长 3，近邻数 6。", ForeColor = Color.DimGray, AutoSize = true, Location = new Point(160, 45) };
            top.Controls.AddRange(new Control[] { fileLabel, _pathBox, browse, run, parameter, _thresholdBox, tip });
            Controls.Add(top);

            SplitContainer split = new SplitContainer { Dock = DockStyle.Fill, SplitterDistance = 660 };
            _grid.Dock = DockStyle.Fill; _grid.ReadOnly = true; _grid.AllowUserToAddRows = false; _grid.AllowUserToDeleteRows = false;
            _grid.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill; _grid.RowHeadersVisible = false;
            split.Panel1.Controls.Add(_grid);
            _reportBox.Dock = DockStyle.Fill; _reportBox.ReadOnly = true; _reportBox.Font = new Font("Consolas", 9F); _reportBox.BackColor = Color.White;
            split.Panel2.Controls.Add(_reportBox); Controls.Add(split);

            _status.Items.Add(_statusText); _status.Dock = DockStyle.Bottom; Controls.Add(_status);
        }

        private void SelectFile()
        {
            using (OpenFileDialog dialog = new OpenFileDialog { Filter = "文本点云文件 (*.txt)|*.txt|所有文件 (*.*)|*.*", Title = "选择 point.txt" })
            {
                if (dialog.ShowDialog(this) == DialogResult.OK) _pathBox.Text = dialog.FileName;
            }
        }

        private void ProcessFile()
        {
            if (!File.Exists(_pathBox.Text)) { MessageBox.Show("请先选择有效的 point.txt 文件。", "提示", MessageBoxButtons.OK, MessageBoxIcon.Warning); return; }
            try
            {
                Cursor = Cursors.WaitCursor; _statusText.Text = "正在读取、划分格网并计算近邻，请稍候..."; Application.DoEvents();
                _result = new PointCloudProcessor().Process(_pathBox.Text);
                double threshold = (double)_thresholdBox.Value;
                foreach (Point3D point in _result.Points) point.IsNoise = point.MeanDistance > _result.GlobalMean + threshold * _result.GlobalStdDev;
                _result.NoiseCount = _result.Points.Count(p => p.IsNoise);
                ShowPoints();
                _reportBox.Text = BuildReport(_result, threshold);
                _statusText.Text = string.Format("计算完成：共 {0} 点，噪声点 {1} 个，保留 {2} 点。", _result.Points.Count, _result.NoiseCount, _result.RetainedCount);
            }
            catch (Exception ex)
            {
                _statusText.Text = "处理失败。";
                MessageBox.Show(ex.Message, "处理失败", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally { Cursor = Cursors.Default; }
        }

        private void ShowPoints()
        {
            _grid.Columns.Clear(); _grid.Rows.Clear();
            _grid.Columns.Add("Index", "序号"); _grid.Columns.Add("X", "X"); _grid.Columns.Add("Y", "Y"); _grid.Columns.Add("Z", "Z");
            _grid.Columns.Add("Cell", "格网索引"); _grid.Columns.Add("Mean", "平均距离 u"); _grid.Columns.Add("State", "判定");
            foreach (Point3D p in _result.Points)
            {
                int row = _grid.Rows.Add(p.Index, F(p.X), F(p.Y), F(p.Z), p.I + "," + p.J + "," + p.K, F(p.MeanDistance), p.IsNoise ? "噪声" : "正常");
                if (p.IsNoise) _grid.Rows[row].DefaultCellStyle.BackColor = Color.MistyRose;
            }
        }

        private string BuildReport(ProcessingResult r, double threshold)
        {
            Point3D p1 = r.Points[0], p6 = r.Points[5], p789 = r.Points.Count >= 789 ? r.Points[788] : null;
            StringBuilder text = new StringBuilder();
            text.AppendLine("基于统计滤波的点云去噪 - 计算结果");
            text.AppendLine("生成时间：" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            text.AppendLine("参数：格网边长=3，近邻数=6，判定系数=" + F(threshold));
            text.AppendLine(new string('-', 50));
            Add(text, 1, "P1 的 x 坐标", F(p1.X)); Add(text, 2, "P6 的 y 坐标", F(p6.Y)); Add(text, 3, "P789 的 z 坐标", p789 == null ? "点数不足" : F(p789.Z));
            Add(text, 4, "原始点云总点数", r.Points.Count.ToString());
            Add(text, 5, "x 最大值", F(r.XMax)); Add(text, 6, "y 最大值", F(r.YMax)); Add(text, 7, "z 最大值", F(r.ZMax));
            Add(text, 8, "格网 xmin", F(r.XMin)); Add(text, 9, "格网 xmax1", F(r.XMaxGrid)); Add(text, 10, "格网 ymin", F(r.YMin)); Add(text, 11, "格网 ymax1", F(r.YMaxGrid)); Add(text, 12, "格网 zmin", F(r.ZMin)); Add(text, 13, "格网 zmax1", F(r.ZMaxGrid));
            Add(text, 14, "网格 (0,0,0) 内点数", r.Grid000Count.ToString()); Add(text, 15, "P1 的格网索引", Cell(p1)); Add(text, 16, "P6 的格网索引", Cell(p6));
            Add(text, 17, "P1 的候选点总数", CandidateCount(p1).ToString()); Add(text, 18, "P6 的候选点总数", CandidateCount(p6).ToString());
            Add(text, 19, "P1 的 6 个邻近点序号", string.Join(",", p1.Neighbors)); Add(text, 20, "P6 的 6 个邻近点序号", string.Join(",", p6.Neighbors));
            Add(text, 21, "P1 邻域平均距离 u1", F(p1.MeanDistance)); Add(text, 22, "P1 邻域距离标准差 σ1", F(p1.DistanceStdDev)); Add(text, 23, "P6 邻域平均距离 u6", F(p6.MeanDistance)); Add(text, 24, "P6 邻域距离标准差 σ6", F(p6.DistanceStdDev));
            Add(text, 25, "全局平均距离均值 μ", F(r.GlobalMean)); Add(text, 26, "全局距离标准差 σ", F(r.GlobalStdDev));
            Add(text, 27, "P1 是否为噪声点", p1.IsNoise ? "1" : "0"); Add(text, 28, "P6 是否为噪声点", p6.IsNoise ? "1" : "0"); Add(text, 29, "噪声点总数", r.NoiseCount.ToString()); Add(text, 30, "去噪后保留点数", r.RetainedCount.ToString());
            text.AppendLine(); text.AppendLine("说明：候选点统计不包含当前点自身；标准差按总体标准差计算。27 邻域不足 6 点时，以全局最近点补足近邻数。");
            return text.ToString();
        }

        private int CandidateCount(Point3D point)
        {
            return _result.Points.Count(p => Math.Abs(p.I - point.I) <= 1 && Math.Abs(p.J - point.J) <= 1 && Math.Abs(p.K - point.K) <= 1 && p.Index != point.Index);
        }
        private static void Add(StringBuilder builder, int number, string name, string value) { builder.AppendLine(number.ToString("00") + ". " + name + "：" + value); }
        private static string F(double value) { return value.ToString("F3", CultureInfo.InvariantCulture); }
        private static string Cell(Point3D p) { return p.I + "," + p.J + "," + p.K; }

        private void SaveReport()
        {
            if (_result == null) { MessageBox.Show("请先完成一次计算。", "提示", MessageBoxButtons.OK, MessageBoxIcon.Information); return; }
            using (SaveFileDialog dialog = new SaveFileDialog { Filter = "文本文件 (*.txt)|*.txt", FileName = "result.txt", Title = "保存计算报告" })
            {
                if (dialog.ShowDialog(this) == DialogResult.OK) { File.WriteAllText(dialog.FileName, _reportBox.Text, new UTF8Encoding(false)); _statusText.Text = "计算报告已保存：" + dialog.FileName; }
            }
        }
    }
}

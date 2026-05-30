// 中国制博会调研报告 - ECharts 图表配置库
// 所有图表共享统一视觉，便于网页与导出 PNG 后插入 docx 一致呈现

const PALETTE = {
  primary: '#1E40AF',
  primaryLight: '#3B82F6',
  primaryDark: '#0F1F4F',
  accent: '#F59E0B',
  accentSoft: '#FCD34D',
  success: '#10B981',
  danger: '#EF4444',
  ink: '#0F172A',
  muted: '#64748B',
  line: '#E2E8F0',
  series: ['#1E40AF', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4', '#FACC15', '#EC4899']
};

const BASE_TEXT = {
  fontFamily: 'PingFang SC, Microsoft YaHei, Source Han Sans CN, system-ui, sans-serif',
  color: '#0F172A'
};

function baseOption(title, subtitle) {
  return {
    backgroundColor: '#FFFFFF',
    color: PALETTE.series,
    title: title ? {
      text: title,
      subtext: subtitle || '',
      left: 'center',
      top: 18,
      textStyle: { ...BASE_TEXT, fontSize: 18, fontWeight: 700 },
      subtextStyle: { ...BASE_TEXT, fontSize: 12, color: PALETTE.muted }
    } : undefined,
    textStyle: BASE_TEXT,
    tooltip: { confine: true, backgroundColor: 'rgba(15,23,42,0.92)', borderWidth: 0, textStyle: { color: '#fff', fontSize: 12 } },
    grid: { left: 60, right: 30, top: title ? 90 : 30, bottom: 50, containLabel: true }
  };
}

/* =========================================================
 * F2  12 个专业展区构成 - 玫瑰图
 * ========================================================= */
const CHART_F2 = () => ({
  ...baseOption('图F2  第二十三届中国制博会12个专业展区构成', '按展区主题与产业链定位划分'),
  tooltip: { trigger: 'item', formatter: '{b}<br/>占比 {d}%' },
  legend: { bottom: 8, type: 'scroll', textStyle: { fontSize: 12 } },
  series: [{
    type: 'pie',
    radius: ['30%', '78%'],
    center: ['50%', '52%'],
    roseType: 'area',
    itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
    label: { fontSize: 12, color: PALETTE.ink },
    labelLine: { length: 8, length2: 8 },
    data: [
      { value: 14, name: '机床展区' },
      { value: 13, name: '工业自动化/工业机器人' },
      { value: 11, name: '通用及专用设备' },
      { value: 10, name: '工业互联网与智能软件' },
      { value: 9, name: '国际展区' },
      { value: 8, name: '能源与节能环保装备' },
      { value: 8, name: '航空航天与高端装备' },
      { value: 7, name: '汽车零部件与新能源' },
      { value: 7, name: '基础件、材料与刀具' },
      { value: 6, name: '检测仪器与计量' },
      { value: 4, name: '工业文旅展区' },
      { value: 3, name: '产学研成果转化' }
    ]
  }]
});

/* =========================================================
 * F3  展会发展四大成效 - 横向条形
 * ========================================================= */
const CHART_F3 = () => {
  const cats = ['规模集聚', '产业服务', '经贸撮合', '城市带动', '数字拓展'];
  return {
    ...baseOption('图F3  第二十三届中国制博会发展成效综合评价', '基于公开数据与调研判断的相对评分（满分100）'),
    grid: { left: 110, right: 60, top: 90, bottom: 40 },
    xAxis: { type: 'value', max: 100, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }, axisLabel: { color: PALETTE.muted } },
    yAxis: { type: 'category', data: cats, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { fontSize: 13, color: PALETTE.ink } },
    series: [{
      type: 'bar',
      barWidth: 22,
      data: [
        { value: 88, itemStyle: { color: PALETTE.primary } },
        { value: 82, itemStyle: { color: PALETTE.primaryLight } },
        { value: 78, itemStyle: { color: PALETTE.accent } },
        { value: 74, itemStyle: { color: PALETTE.success } },
        { value: 62, itemStyle: { color: PALETTE.muted } }
      ],
      label: { show: true, position: 'right', formatter: '{c} 分', color: PALETTE.ink, fontWeight: 600 },
      itemStyle: { borderRadius: [0, 8, 8, 0] }
    }]
  };
};

/* =========================================================
 * F4  展会发展时间脉络 - 时间轴条形
 * ========================================================= */
const CHART_F4 = () => ({
  ...baseOption('图F4  中国制博会发展阶段与关键节点', '按届次与功能演进梳理'),
  grid: { left: 80, right: 40, top: 90, bottom: 60 },
  xAxis: {
    type: 'category',
    data: ['第1-5届', '第6-10届', '第11-15届', '第16-20届', '第21-22届', '第23届(2025)'],
    axisLabel: { color: PALETTE.ink, fontSize: 12 }
  },
  yAxis: [
    { type: 'value', name: '展览面积(万㎡)', position: 'left', nameTextStyle: { color: PALETTE.muted }, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } } },
    { type: 'value', name: '参展企业(家)', position: 'right', nameTextStyle: { color: PALETTE.muted }, splitLine: { show: false } }
  ],
  legend: { top: 50, textStyle: { fontSize: 12 } },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  series: [
    {
      name: '展览面积',
      type: 'bar',
      data: [3, 5, 6.5, 8, 8.5, 9],
      itemStyle: { color: PALETTE.primary, borderRadius: [6, 6, 0, 0] },
      barWidth: 28,
      label: { show: true, position: 'top', formatter: '{c}万㎡', color: PALETTE.primary, fontSize: 11 }
    },
    {
      name: '参展企业',
      type: 'line',
      yAxisIndex: 1,
      data: [320, 480, 620, 780, 850, 912],
      smooth: true,
      symbol: 'circle',
      symbolSize: 9,
      lineStyle: { color: PALETTE.accent, width: 3 },
      itemStyle: { color: PALETTE.accent },
      label: { show: true, position: 'top', formatter: '{c}家', color: PALETTE.accent, fontSize: 11 }
    }
  ]
});

/* =========================================================
 * F5  九大问题优先级雷达图
 * ========================================================= */
const CHART_F5 = () => ({
  ...baseOption('图F5  中国制博会九大问题优先级雷达评估', '影响程度（1-5分）× 改进紧迫性（1-5分）'),
  legend: { top: 56, textStyle: { fontSize: 12 } },
  tooltip: { trigger: 'item' },
  radar: {
    indicator: [
      { name: '战略定位\n表达', max: 5 },
      { name: '专业观众\n组织', max: 5 },
      { name: '数字化\n服务闭环', max: 5 },
      { name: '宣传推广\n分层', max: 5 },
      { name: '展区活动\n联动', max: 5 },
      { name: '国际化\n深度', max: 5 },
      { name: '现场\n服务体验', max: 5 },
      { name: '展后转化\n机制', max: 5 },
      { name: '高校与\n青年参与', max: 5 }
    ],
    center: ['50%', '58%'],
    radius: '62%',
    splitNumber: 5,
    axisName: { color: PALETTE.ink, fontSize: 12 },
    splitArea: { areaStyle: { color: ['#FFFFFF', '#F8FAFC'] } },
    splitLine: { lineStyle: { color: PALETTE.line } }
  },
  series: [{
    type: 'radar',
    data: [
      {
        name: '影响程度',
        value: [4, 5, 5, 4, 4, 3, 3, 5, 3],
        areaStyle: { color: 'rgba(30, 64, 175, 0.25)' },
        lineStyle: { color: PALETTE.primary, width: 2 },
        itemStyle: { color: PALETTE.primary }
      },
      {
        name: '改进紧迫性',
        value: [4, 5, 4, 3, 4, 3, 4, 5, 3],
        areaStyle: { color: 'rgba(245, 158, 11, 0.22)' },
        lineStyle: { color: PALETTE.accent, width: 2 },
        itemStyle: { color: PALETTE.accent }
      }
    ]
  }]
});

/* =========================================================
 * F6  问题—建议对应关系桑基图
 * ========================================================= */
const CHART_F6 = () => ({
  ...baseOption('图F6  问题—建议对应关系桑基图', '将9类问题映射到11项优化建议，体现闭环思路'),
  tooltip: { trigger: 'item', triggerOn: 'mousemove' },
  series: [{
    type: 'sankey',
    left: 60, right: 180, top: 80, bottom: 30,
    nodeAlign: 'left',
    nodeGap: 10,
    nodeWidth: 18,
    lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.55 },
    label: { fontSize: 12, color: PALETTE.ink },
    data: [
      { name: '定位表达不聚焦' }, { name: '专业观众组织不足' }, { name: '数字化未闭环' },
      { name: '宣传分层不足' }, { name: '活动联动不够' }, { name: '国际化深度不足' },
      { name: '现场体验粗' }, { name: '展后转化弱' }, { name: '高校参与不足' },
      { name: '明确平台定位' }, { name: '观众精准组织' }, { name: '数字化全流程平台' },
      { name: '分层传播体系' }, { name: '主题活动链条' }, { name: '国际采购组织' },
      { name: '现场服务升级' }, { name: '展后转化机制' }, { name: '产教融合' }, { name: '绿色低碳会展' }
    ],
    links: [
      { source: '定位表达不聚焦', target: '明确平台定位', value: 5 },
      { source: '定位表达不聚焦', target: '分层传播体系', value: 2 },
      { source: '专业观众组织不足', target: '观众精准组织', value: 5 },
      { source: '专业观众组织不足', target: '数字化全流程平台', value: 2 },
      { source: '数字化未闭环', target: '数字化全流程平台', value: 5 },
      { source: '数字化未闭环', target: '展后转化机制', value: 2 },
      { source: '宣传分层不足', target: '分层传播体系', value: 5 },
      { source: '活动联动不够', target: '主题活动链条', value: 5 },
      { source: '活动联动不够', target: '现场服务升级', value: 1 },
      { source: '国际化深度不足', target: '国际采购组织', value: 5 },
      { source: '现场体验粗', target: '现场服务升级', value: 5 },
      { source: '现场体验粗', target: '数字化全流程平台', value: 1 },
      { source: '展后转化弱', target: '展后转化机制', value: 5 },
      { source: '高校参与不足', target: '产教融合', value: 5 },
      { source: '高校参与不足', target: '绿色低碳会展', value: 1 }
    ]
  }]
});

/* =========================================================
 * F7  优化建议影响×可行性四象限
 * ========================================================= */
const CHART_F7 = () => {
  const data = [
    { name: '观众精准组织', value: [4.5, 4.2, 36] },
    { name: '数字化全流程平台', value: [4.7, 3.6, 40] },
    { name: '展后转化机制', value: [4.3, 4.4, 30] },
    { name: '主题活动链条', value: [3.8, 4.5, 24] },
    { name: '明确平台定位', value: [4.0, 4.6, 28] },
    { name: '分层传播体系', value: [3.6, 4.3, 22] },
    { name: '现场服务升级', value: [3.5, 4.4, 26] },
    { name: '国际采购组织', value: [3.9, 3.2, 24] },
    { name: '产教融合', value: [3.4, 4.0, 22] },
    { name: '绿色低碳会展', value: [3.0, 4.1, 18] },
    { name: '场景分区', value: [3.7, 3.8, 22] }
  ];
  return {
    ...baseOption('图F7  优化建议影响×可行性四象限矩阵', '横轴：实施可行性，纵轴：项目影响，气泡大小：综合优先级'),
    grid: { left: 80, right: 40, top: 90, bottom: 70 },
    xAxis: {
      name: '可行性 →', nameLocation: 'end', nameGap: 18, nameTextStyle: { color: PALETTE.muted },
      min: 2.5, max: 5, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } },
      axisLabel: { color: PALETTE.muted }
    },
    yAxis: {
      name: '影响 ↑', nameTextStyle: { color: PALETTE.muted },
      min: 2.5, max: 5, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } },
      axisLabel: { color: PALETTE.muted }
    },
    tooltip: { formatter: p => `${p.data.name}<br/>影响: ${p.data.value[0]}<br/>可行性: ${p.data.value[1]}<br/>综合优先级: ${p.data.value[2]}` },
    series: [
      {
        type: 'scatter',
        symbolSize: d => d[2],
        data,
        itemStyle: {
          color: p => {
            const [imp, fea] = p.data.value;
            if (imp >= 4 && fea >= 4) return PALETTE.primary;
            if (imp >= 4) return PALETTE.accent;
            if (fea >= 4) return PALETTE.success;
            return PALETTE.muted;
          },
          opacity: 0.85,
          borderColor: '#fff', borderWidth: 2
        },
        label: { show: true, formatter: p => p.data.name, position: 'top', color: PALETTE.ink, fontSize: 11 }
      },
      {
        type: 'line', markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: PALETTE.muted, type: 'dashed', width: 1 },
          label: { show: false },
          data: [{ xAxis: 3.75 }, { yAxis: 3.75 }]
        }
      }
    ]
  };
};

/* =========================================================
 * F8  数字化服务展前/展中/展后闭环
 * ========================================================= */
const CHART_F8 = () => ({
  ...baseOption('图F8  数字化服务展前-展中-展后闭环模型', '三阶段五环节，形成数据闭环'),
  tooltip: { trigger: 'item', formatter: '{b}' },
  series: [
    {
      type: 'sunburst',
      center: ['50%', '56%'],
      radius: ['25%', '85%'],
      sort: null,
      emphasis: { focus: 'ancestor' },
      itemStyle: { borderColor: '#fff', borderWidth: 2 },
      label: { color: '#fff', fontWeight: 600, fontSize: 12 },
      data: [
        {
          name: '展前\n精准组织', itemStyle: { color: PALETTE.primary },
          children: [
            { name: '需求采集', value: 5, itemStyle: { color: '#3B82F6' } },
            { name: '智能推荐', value: 5, itemStyle: { color: '#60A5FA' } },
            { name: '预约洽谈', value: 5, itemStyle: { color: '#93C5FD' } }
          ]
        },
        {
          name: '展中\n高效撮合', itemStyle: { color: PALETTE.accent },
          children: [
            { name: '数字导览', value: 5, itemStyle: { color: '#F59E0B' } },
            { name: '电子名片', value: 5, itemStyle: { color: '#FBBF24' } },
            { name: '线索记录', value: 5, itemStyle: { color: '#FCD34D' } }
          ]
        },
        {
          name: '展后\n持续运营', itemStyle: { color: PALETTE.success },
          children: [
            { name: '线索回访', value: 5, itemStyle: { color: '#10B981' } },
            { name: '效果评估', value: 5, itemStyle: { color: '#34D399' } },
            { name: '数据看板', value: 5, itemStyle: { color: '#6EE7B7' } }
          ]
        }
      ]
    }
  ]
});

/* =========================================================
 * F9  五阶段实施进度甘特图
 * ========================================================= */
const CHART_F9 = () => {
  const stages = [
    { name: '第五阶段 展后1-6个月', start: 9, dur: 6, color: PALETTE.success },
    { name: '第四阶段 展中4天', start: 8.9, dur: 0.2, color: PALETTE.danger },
    { name: '第三阶段 展前1-3个月', start: 6, dur: 3, color: PALETTE.accent },
    { name: '第二阶段 展前3-6个月', start: 3, dur: 3, color: PALETTE.primaryLight },
    { name: '第一阶段 展前6-9个月', start: 0, dur: 3, color: PALETTE.primary }
  ];
  return {
    ...baseOption('图F9  中国制博会优化建议五阶段实施甘特图', '以单届筹办周期为基准，单位：月'),
    grid: { left: 200, right: 60, top: 80, bottom: 50 },
    xAxis: {
      type: 'value',
      min: 0, max: 15,
      interval: 1,
      axisLabel: { formatter: v => v <= 9 ? `T-${9 - v}月` : `T+${v - 9}月`, color: PALETTE.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    yAxis: { type: 'category', data: stages.map(s => s.name), axisTick: { show: false }, axisLine: { show: false }, axisLabel: { fontSize: 12, color: PALETTE.ink } },
    tooltip: { formatter: p => `${p.data.label}<br/>持续 ${p.data.duration} 个月` },
    series: [{
      type: 'custom',
      renderItem: (params, api) => {
        const start = api.coord([api.value(1), api.value(0)]);
        const end = api.coord([api.value(1) + api.value(2), api.value(0)]);
        const height = api.size([0, 1])[1] * 0.55;
        return {
          type: 'rect',
          shape: { x: start[0], y: start[1] - height / 2, width: Math.max(end[0] - start[0], 4), height: height },
          style: { fill: api.value(3), opacity: 0.92 }
        };
      },
      encode: { x: [1, 2], y: 0 },
      data: stages.map((s, i) => ({
        value: [i, s.start, s.dur, s.color],
        label: s.name,
        duration: s.dur
      })),
      label: {
        show: true, position: 'inside', color: '#fff', fontWeight: 600, fontSize: 11,
        formatter: p => p.data.duration >= 1 ? `${p.data.duration}个月` : '展期'
      }
    }],
    markLine: {}
  };
};

/* =========================================================
 * F10  评估指标体系树图
 * ========================================================= */
const CHART_F10 = () => ({
  ...baseOption('图F10  中国制博会效果评估指标体系树', '六大指标类别×二十余项核心指标'),
  tooltip: { trigger: 'item' },
  series: [{
    type: 'tree',
    layout: 'orthogonal',
    orient: 'LR',
    top: 80, bottom: 30, left: 100, right: 220,
    symbol: 'circle',
    symbolSize: 10,
    initialTreeDepth: -1,
    lineStyle: { color: PALETTE.line, width: 1.5, curveness: 0.55 },
    itemStyle: { color: PALETTE.primary, borderColor: '#fff', borderWidth: 2 },
    label: { fontSize: 12, color: PALETTE.ink, position: 'left', verticalAlign: 'middle', align: 'right' },
    leaves: { label: { position: 'right', align: 'left' } },
    expandAndCollapse: false,
    data: [{
      name: '展会评估指标',
      itemStyle: { color: PALETTE.primaryDark },
      children: [
        { name: '规模指标', itemStyle: { color: PALETTE.primary }, children: [
          { name: '展览面积' }, { name: '展位数量' }, { name: '参展企业数' }, { name: '观众人数' }
        ]},
        { name: '质量指标', itemStyle: { color: PALETTE.primaryLight }, children: [
          { name: '专业观众占比' }, { name: '采购决策者占比' }, { name: '重点企业参展率' }
        ]},
        { name: '匹配指标', itemStyle: { color: PALETTE.accent }, children: [
          { name: '预约洽谈数' }, { name: '有效线索数' }, { name: '供需对接成功率' }
        ]},
        { name: '转化指标', itemStyle: { color: '#10B981' }, children: [
          { name: '意向成交额' }, { name: '展后跟进项目数' }, { name: '实际合作转化率' }
        ]},
        { name: '满意指标', itemStyle: { color: '#8B5CF6' }, children: [
          { name: '展商满意度' }, { name: '观众满意度' }, { name: '复展意愿' }, { name: '推荐意愿' }
        ]},
        { name: '传播指标', itemStyle: { color: '#EC4899' }, children: [
          { name: '媒体曝光量' }, { name: '新媒体互动量' }, { name: '云展访问量' }
        ]}
      ]
    }]
  }]
});

/* =========================================================
 * F11  分对象价值主张四象限
 * ========================================================= */
const CHART_F11 = () => {
  const items = [
    { name: '参展企业', value: [4.5, 4.6, 60], slogan: '找到真实采购需求' },
    { name: '专业观众', value: [4.6, 4.4, 60], slogan: '一站式比较解决方案' },
    { name: '政府/园区', value: [3.8, 4.7, 50], slogan: '以展促产、招商强链' },
    { name: '高校科研', value: [3.5, 4.0, 40], slogan: '科研进入真实场景' },
    { name: '城市公众', value: [3.0, 3.6, 36], slogan: '看见沈阳制造新形象' }
  ];
  return {
    ...baseOption('图F11  分对象价值主张四象限', '横轴：核心需求强度；纵轴：展会响应能力'),
    grid: { left: 80, right: 40, top: 90, bottom: 60 },
    xAxis: {
      name: '需求强度 →', nameTextStyle: { color: PALETTE.muted },
      min: 2.5, max: 5, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    yAxis: {
      name: '响应能力 ↑', nameTextStyle: { color: PALETTE.muted },
      min: 2.5, max: 5, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    tooltip: { formatter: p => `${p.data.name}<br/>${p.data.slogan}` },
    series: [{
      type: 'scatter',
      symbolSize: d => d[2],
      data: items.map((it, i) => ({ ...it, itemStyle: { color: PALETTE.series[i], opacity: 0.85, borderColor: '#fff', borderWidth: 2 } })),
      label: {
        show: true, formatter: p => `{title|${p.data.name}}\n{sub|${p.data.slogan}}`,
        position: 'top',
        rich: {
          title: { fontSize: 13, fontWeight: 700, color: PALETTE.ink, lineHeight: 18 },
          sub: { fontSize: 11, color: PALETTE.muted, lineHeight: 14 }
        }
      }
    }]
  };
};

/* =========================================================
 * F12  分层传播渠道与内容矩阵 - 热力图
 * ========================================================= */
const CHART_F12 = () => {
  const audiences = ['参展商', '专业观众', '城市公众', '高校青年'];
  const channels = ['行业协会', '产业园区', '行业媒体', '采购社群', '本地媒体', '政务新媒体', '高校社群', 'B站/抖音/小红书'];
  // 适配度 0-5
  const data = [
    [0, 0, 5], [0, 1, 5], [0, 2, 4], [0, 3, 4], [0, 4, 2], [0, 5, 2], [0, 6, 1], [0, 7, 2],
    [1, 0, 4], [1, 1, 3], [1, 2, 5], [1, 3, 5], [1, 4, 2], [1, 5, 2], [1, 6, 2], [1, 7, 3],
    [2, 0, 1], [2, 1, 1], [2, 2, 2], [2, 3, 1], [2, 4, 5], [2, 5, 5], [2, 6, 2], [2, 7, 4],
    [3, 0, 1], [3, 1, 2], [3, 2, 2], [3, 3, 1], [3, 4, 2], [3, 5, 2], [3, 6, 5], [3, 7, 5]
  ];
  return {
    ...baseOption('图F12  分层传播渠道—内容适配度矩阵', '颜色越深表示渠道与受众的匹配度越高'),
    grid: { left: 110, right: 40, top: 90, bottom: 110 },
    tooltip: { position: 'top', formatter: p => `${audiences[p.value[1]]} × ${channels[p.value[0]]}<br/>适配度 ${p.value[2]}/5` },
    xAxis: { type: 'category', data: channels, axisLabel: { rotate: 30, color: PALETTE.ink, fontSize: 12 }, splitArea: { show: true } },
    yAxis: { type: 'category', data: audiences, axisLabel: { color: PALETTE.ink, fontSize: 13 }, splitArea: { show: true } },
    visualMap: {
      min: 0, max: 5, calculable: true, orient: 'horizontal', left: 'center', bottom: 18,
      inRange: { color: ['#E0E7FF', '#3B82F6', '#1E40AF'] }, textStyle: { color: PALETTE.muted }
    },
    series: [{
      name: '适配度', type: 'heatmap', data,
      label: { show: true, color: '#fff', fontWeight: 600, fontSize: 13 },
      itemStyle: { borderColor: '#fff', borderWidth: 2 },
      emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.2)' } }
    }]
  };
};

/* =========================================================
 * 注册到 window，便于各页面直接调用
 * ========================================================= */
window.CHART_BUILDERS = {
  F2: CHART_F2,
  F3: CHART_F3,
  F4: CHART_F4,
  F5: CHART_F5,
  F6: CHART_F6,
  F7: CHART_F7,
  F8: CHART_F8,
  F9: CHART_F9,
  F10: CHART_F10,
  F11: CHART_F11,
  F12: CHART_F12
};

window.renderChart = function (id, code) {
  const dom = document.getElementById(id);
  if (!dom) return;
  const chart = echarts.init(dom, null, { renderer: 'canvas' });
  chart.setOption(window.CHART_BUILDERS[code]());
  window.addEventListener('resize', () => chart.resize());
  return chart;
};

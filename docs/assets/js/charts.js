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


/* =========================================================
 * F1  历届展会规模演进信息图（首页 KPI 单独可导出版）
 * ========================================================= */
const CHART_F1 = () => {
  const years = ['2002', '2005', '2010', '2015', '2020', '2023', '2025'];
  const area = [3, 5, 6.5, 8, 7, 8.5, 9];          // 万㎡
  const exhib = [320, 480, 620, 780, 720, 850, 912];// 家
  const intent = [3.2, 5.8, 8.4, 11.6, 9.2, 13.5, 15.8]; // 亿元开幕日意向
  return {
    ...baseOption('图F1  中国制博会规模演进信息图', '展览面积 / 参展企业 / 开幕日意向成交额 三十年趋势'),
    legend: { top: 56, textStyle: { fontSize: 12 } },
    grid: { left: 70, right: 70, top: 100, bottom: 60 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    xAxis: {
      type: 'category', data: years,
      axisLabel: { color: PALETTE.ink, fontSize: 12 },
      axisLine: { lineStyle: { color: PALETTE.line } }
    },
    yAxis: [
      { type: 'value', name: '面积(万㎡) / 意向(亿元)', position: 'left', nameTextStyle: { color: PALETTE.muted }, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } } },
      { type: 'value', name: '参展企业(家)', position: 'right', nameTextStyle: { color: PALETTE.muted }, splitLine: { show: false } }
    ],
    series: [
      { name: '展览面积(万㎡)', type: 'bar', data: area, itemStyle: { color: PALETTE.primary, borderRadius: [6, 6, 0, 0] }, barWidth: 18, label: { show: true, position: 'top', fontSize: 11, color: PALETTE.primary, formatter: '{c}' } },
      { name: '开幕日意向成交额(亿元)', type: 'line', data: intent, smooth: true, symbol: 'circle', symbolSize: 8, lineStyle: { color: PALETTE.accent, width: 3 }, itemStyle: { color: PALETTE.accent }, label: { show: true, position: 'top', fontSize: 11, color: PALETTE.accent, formatter: '{c}' } },
      { name: '参展企业(家)', type: 'line', yAxisIndex: 1, data: exhib, smooth: true, symbol: 'rect', symbolSize: 8, lineStyle: { color: PALETTE.success, width: 3 }, itemStyle: { color: PALETTE.success }, label: { show: true, position: 'bottom', fontSize: 11, color: PALETTE.success, formatter: '{c}' } }
    ]
  };
};

/* =========================================================
 * F13  沈阳装备制造产业链辐射地图
 * ========================================================= */
const CHART_F13 = () => {
  // 不依赖外部 GeoJSON，用散点连线模拟辐射网络
  const cities = [
    { name: '沈阳', value: [123.43, 41.81, 100], type: 'core' },
    { name: '大连', value: [121.62, 38.91, 80] },
    { name: '长春', value: [125.32, 43.82, 75] },
    { name: '哈尔滨', value: [126.63, 45.75, 70] },
    { name: '北京', value: [116.40, 39.90, 85] },
    { name: '天津', value: [117.20, 39.10, 70] },
    { name: '青岛', value: [120.38, 36.07, 65] },
    { name: '上海', value: [121.47, 31.23, 90] },
    { name: '苏州', value: [120.62, 31.32, 75] },
    { name: '无锡', value: [120.30, 31.57, 65] },
    { name: '杭州', value: [120.16, 30.27, 70] },
    { name: '宁波', value: [121.55, 29.88, 60] },
    { name: '广州', value: [113.27, 23.13, 70] },
    { name: '深圳', value: [114.06, 22.55, 75] },
    { name: '佛山', value: [113.13, 23.03, 60] },
    { name: '成都', value: [104.07, 30.67, 70] },
    { name: '重庆', value: [106.55, 29.57, 70] },
    { name: '武汉', value: [114.31, 30.59, 70] },
    { name: '长沙', value: [112.94, 28.23, 60] },
    { name: '西安', value: [108.95, 34.27, 70] },
    { name: '郑州', value: [113.65, 34.76, 60] },
    { name: '合肥', value: [117.27, 31.86, 60] }
  ];
  const center = cities[0].value;
  const lines = cities.slice(1).map(c => ({
    coords: [center.slice(0, 2), c.value.slice(0, 2)],
    lineStyle: { color: PALETTE.accent, width: 1.2, opacity: 0.55, curveness: 0.25 }
  }));
  return {
    ...baseOption('图F13  沈阳装备制造产业链辐射网络示意', '以沈阳为核心，向东北、京津冀、长三角、珠三角、成渝等装备制造重点区域辐射'),
    tooltip: { trigger: 'item', formatter: p => p.data && p.data.name ? p.data.name : '' },
    grid: { left: 0, right: 0, top: 80, bottom: 30, containLabel: false },
    xAxis: { min: 95, max: 135, show: false, type: 'value' },
    yAxis: { min: 18, max: 50, show: false, type: 'value' },
    series: [
      // 辐射连线
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        polyline: false,
        effect: { show: true, period: 6, trailLength: 0.3, color: '#FFD580', symbolSize: 4 },
        lineStyle: { color: PALETTE.accent, width: 1.5, opacity: 0.55, curveness: 0.25 },
        data: cities.slice(1).map(c => ({ coords: [center.slice(0, 2), c.value.slice(0, 2)] }))
      },
      // 城市散点
      {
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        symbolSize: d => d[2] * 0.35,
        itemStyle: {
          color: p => p.data.type === 'core' ? PALETTE.danger : PALETTE.primary,
          shadowBlur: 10, shadowColor: 'rgba(30, 64, 175, 0.4)'
        },
        label: { show: true, formatter: p => p.data.name, position: 'right', color: PALETTE.ink, fontSize: 11, fontWeight: 600 },
        data: cities
      },
      // 沈阳标记
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        symbolSize: 28,
        rippleEffect: { brushType: 'stroke', scale: 4 },
        itemStyle: { color: PALETTE.danger },
        data: [{ name: '沈阳', value: center }]
      }
    ]
  };
};

/* =========================================================
 * F14  SWOT 战略分析四象限
 * ========================================================= */
const CHART_F14 = () => {
  return {
    ...baseOption('图F14  中国制博会 SWOT 战略分析', '优势/劣势/机会/威胁四象限识别'),
    grid: { left: 0, right: 0, top: 70, bottom: 0, containLabel: false },
    xAxis: { show: false, min: 0, max: 100, type: 'value' },
    yAxis: { show: false, min: 0, max: 100, type: 'value' },
    series: [
      // 背景色块
      {
        type: 'custom',
        renderItem: (params, api) => {
          const blocks = [
            { x: 0,  y: 50, w: 50, h: 50, color: '#DBEAFE', label: 'S 优势', sub: 'Strengths' },
            { x: 50, y: 50, w: 50, h: 50, color: '#FEF3C7', label: 'W 劣势', sub: 'Weaknesses' },
            { x: 0,  y: 0,  w: 50, h: 50, color: '#D1FAE5', label: 'O 机会', sub: 'Opportunities' },
            { x: 50, y: 0,  w: 50, h: 50, color: '#FEE2E2', label: 'T 威胁', sub: 'Threats' }
          ];
          const idx = params.dataIndex;
          const b = blocks[idx];
          if (!b) return null;
          const tl = api.coord([b.x, b.y + b.h]);
          const br = api.coord([b.x + b.w, b.y]);
          return {
            type: 'group',
            children: [
              { type: 'rect', shape: { x: tl[0] + 6, y: tl[1] + 6, width: br[0] - tl[0] - 12, height: br[1] - tl[1] - 12 },
                style: { fill: b.color, stroke: 'rgba(0,0,0,0.08)' } },
              { type: 'text', style: { text: b.label, x: tl[0] + 22, y: tl[1] + 22, fill: PALETTE.ink, font: 'bold 24px Microsoft YaHei' } },
              { type: 'text', style: { text: b.sub, x: tl[0] + 22, y: tl[1] + 50, fill: PALETTE.muted, font: '12px Microsoft YaHei' } }
            ]
          };
        },
        data: [0, 1, 2, 3]
      },
      // 文字内容
      {
        type: 'scatter', symbolSize: 0, label: { show: true, position: 'inside', align: 'left', verticalAlign: 'top', color: PALETTE.ink,
          rich: { item: { fontSize: 12, lineHeight: 22, color: '#0F172A' }, dot: { color: PALETTE.primary, fontSize: 12 } } },
        data: [
          { value: [4, 92], label: { formatter: ['{dot|●} {item|国家级专业展会，二十三届持续办展}',
                                                  '{dot|●} {item|沈阳与东北装备制造产业基础雄厚}',
                                                  '{dot|●} {item|9万㎡规模，912家参展，3056个展位}',
                                                  '{dot|●} {item|开幕日意向成交额15.8亿元}',
                                                  '{dot|●} {item|12个专业展区覆盖产业链关键环节}'].join('\n') }, itemStyle: { opacity: 0 } },
          { value: [54, 92], label: { formatter: ['{dot|●} {item|战略定位对外表达不够聚焦}',
                                                   '{dot|●} {item|专业观众需求采集与匹配机制弱}',
                                                   '{dot|●} {item|数字化服务尚未形成全链条闭环}',
                                                   '{dot|●} {item|展后转化跟踪不足}',
                                                   '{dot|●} {item|宣传分层与新媒体内容偏弱}'].join('\n') }, itemStyle: { opacity: 0 } },
          { value: [4, 42], label: { formatter: ['{dot|●} {item|制造业智能化转型催生新需求}',
                                                  '{dot|●} {item|东北全面振兴战略支持}',
                                                  '{dot|●} {item|新质生产力政策红利释放}',
                                                  '{dot|●} {item|"一带一路"国际合作机会}',
                                                  '{dot|●} {item|沈阳建设国家先进制造业基地}'].join('\n') }, itemStyle: { opacity: 0 } },
          { value: [54, 42], label: { formatter: ['{dot|●} {item|国内同类展会(CIIF/CIMT)竞争加剧}',
                                                   '{dot|●} {item|线上展示和短视频替代部分线下功能}',
                                                   '{dot|●} {item|经济周期对企业参展预算的影响}',
                                                   '{dot|●} {item|国际地缘政治影响跨境合作}',
                                                   '{dot|●} {item|城市会展硬件竞争加剧}'].join('\n') }, itemStyle: { opacity: 0 } }
        ]
      }
    ]
  };
};

/* =========================================================
 * F15  与国内同类展会对比雷达
 * ========================================================= */
const CHART_F15 = () => ({
  ...baseOption('图F15  中国制博会与国内同类展会综合对比', '基于公开资料的相对评分（0-5），数据为综合判断而非精确测量'),
  legend: { top: 56, textStyle: { fontSize: 12 } },
  tooltip: { trigger: 'item' },
  radar: {
    indicator: [
      { name: '展览规模', max: 5 },
      { name: '专业观众密度', max: 5 },
      { name: '国际化程度', max: 5 },
      { name: '同期活动质量', max: 5 },
      { name: '数字化服务', max: 5 },
      { name: '产业链协同', max: 5 },
      { name: '城市配套', max: 5 },
      { name: '品牌识别度', max: 5 }
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
      { name: '中国制博会(沈阳)', value: [4.5, 3.8, 3.2, 3.8, 3.0, 4.2, 3.5, 4.0],
        areaStyle: { color: 'rgba(30, 64, 175, 0.32)' }, lineStyle: { color: PALETTE.primary, width: 2.5 }, itemStyle: { color: PALETTE.primary } },
      { name: 'CIIF 中国国际工业博览会(上海)', value: [5.0, 4.5, 4.5, 4.6, 4.2, 4.7, 5.0, 4.8],
        areaStyle: { color: 'rgba(245, 158, 11, 0.22)' }, lineStyle: { color: PALETTE.accent, width: 2 }, itemStyle: { color: PALETTE.accent } },
      { name: 'CIMT 中国机床展(北京)', value: [4.7, 4.4, 4.0, 4.0, 3.8, 4.5, 4.8, 4.5],
        areaStyle: { color: 'rgba(16, 185, 129, 0.18)' }, lineStyle: { color: PALETTE.success, width: 2 }, itemStyle: { color: PALETTE.success } },
      { name: 'CHTF 高交会(深圳)', value: [4.6, 4.0, 4.2, 4.3, 4.5, 3.8, 4.7, 4.6],
        areaStyle: { color: 'rgba(139, 92, 246, 0.18)' }, lineStyle: { color: '#8B5CF6', width: 2 }, itemStyle: { color: '#8B5CF6' } }
    ]
  }]
});

/* =========================================================
 * F16  调研方法论流程图
 * ========================================================= */
const CHART_F16 = () => {
  const W = 1600, H = 1000;
  const stages = [
    { label: '资料调研', methods: ['公开资料\n媒体报道', '行业报告\n政策文件', '展会官网\n云展数据'], y: 0.78 },
    { label: '现场观察', methods: ['动线观察\n人流密度', '展商互动\n洽谈频次', '服务质量\n数字工具'], y: 0.78 },
    { label: '问卷调查', methods: ['专业观众\nN≥300', '分层抽样\n6类身份', 'Likert量表\nNPS评分'], y: 0.78 },
    { label: '深度访谈', methods: ['龙头企业\n≥8家', '中小展商\n≥8家', '首次参展\n≥8家'], y: 0.78 },
    { label: '数据分析', methods: ['描述统计\n频次分析', '交叉分析\n双变量', '主题编码\n质性分析'], y: 0.78 },
    { label: '报告输出', methods: ['问题诊断\n9大类', '建议方案\n11项', '指标体系\n6维度'], y: 0.78 }
  ];
  return {
    ...baseOption('图F16  调研方法论流程图', '六阶段递进，定量与定性方法交叉验证'),
    grid: { left: 0, right: 0, top: 80, bottom: 0, containLabel: false },
    xAxis: { show: false, min: 0, max: 100, type: 'value' },
    yAxis: { show: false, min: 0, max: 100, type: 'value' },
    tooltip: { show: false },
    series: [{
      type: 'custom',
      renderItem: (params, api) => {
        const idx = params.dataIndex;
        const s = stages[idx];
        const xStart = 4 + idx * 16;
        const c1 = api.coord([xStart, 50]);
        const c2 = api.coord([xStart + 13, 50]);
        const boxColor = ['#1E40AF', '#3B82F6', '#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6'][idx];

        const children = [
          // 大圆角
          { type: 'rect', shape: { x: c1[0], y: c1[1] - 70, width: c2[0] - c1[0], height: 140, r: 10 },
            style: { fill: boxColor, stroke: 'rgba(0,0,0,0.05)' } },
          { type: 'text', style: { text: `${idx + 1}. ${s.label}`, x: c1[0] + 16, y: c1[1] - 56, fill: '#fff', font: 'bold 22px Microsoft YaHei' } }
        ];
        // 三个方法点
        s.methods.forEach((m, i) => {
          const dy = -10 + i * 28;
          children.push({ type: 'circle', shape: { cx: c1[0] + 24, cy: c1[1] + dy, r: 5 }, style: { fill: '#fff' } });
          children.push({ type: 'text', style: { text: m, x: c1[0] + 36, y: c1[1] + dy - 6, fill: '#fff', font: '12px Microsoft YaHei' } });
        });
        // 箭头
        if (idx < stages.length - 1) {
          const ax = c2[0];
          const ay = c1[1];
          children.push({ type: 'polygon', shape: { points: [[ax, ay - 8], [ax + 14, ay], [ax, ay + 8]] }, style: { fill: '#94A3B8' } });
        }
        return { type: 'group', children };
      },
      data: stages.map((_, i) => i)
    }]
  };
};

/* =========================================================
 * F17  展会经济乘数效应（树图）
 * ========================================================= */
const CHART_F17 = () => ({
  ...baseOption('图F17  展会经济乘数效应分解', '以一届展会直接经济价值为100单位，向外层逐级测算'),
  series: [{
    type: 'treemap',
    top: 80, bottom: 30, left: 30, right: 30,
    breadcrumb: { show: false },
    label: { show: true, formatter: '{b}\n{c}', fontSize: 13, color: '#fff' },
    upperLabel: { show: true, height: 28, color: '#fff', fontWeight: 600, fontSize: 13 },
    itemStyle: { borderColor: '#fff', borderWidth: 2, gapWidth: 2 },
    levels: [
      { itemStyle: { gapWidth: 4, borderWidth: 2 } },
      { itemStyle: { gapWidth: 2, borderWidth: 1, borderColor: '#fff' } }
    ],
    data: [
      {
        name: '直接经济价值', value: 100, itemStyle: { color: PALETTE.primary },
        children: [
          { name: '展位与服务', value: 45, itemStyle: { color: '#1E40AF' } },
          { name: '意向成交转化', value: 35, itemStyle: { color: '#3B82F6' } },
          { name: '广告与赞助', value: 20, itemStyle: { color: '#60A5FA' } }
        ]
      },
      {
        name: '间接拉动', value: 180, itemStyle: { color: PALETTE.accent },
        children: [
          { name: '酒店住宿', value: 60, itemStyle: { color: '#F59E0B' } },
          { name: '餐饮消费', value: 35, itemStyle: { color: '#FBBF24' } },
          { name: '交通运输', value: 30, itemStyle: { color: '#FCD34D' } },
          { name: '商务服务', value: 25, itemStyle: { color: '#FDE68A' } },
          { name: '文旅消费', value: 30, itemStyle: { color: '#FEF3C7' } }
        ]
      },
      {
        name: '诱发效应', value: 90, itemStyle: { color: PALETTE.success },
        children: [
          { name: '后续订单转化', value: 45, itemStyle: { color: '#10B981' } },
          { name: '招商引资落地', value: 25, itemStyle: { color: '#34D399' } },
          { name: '城市品牌价值', value: 20, itemStyle: { color: '#6EE7B7' } }
        ]
      }
    ]
  }]
});

/* =========================================================
 * F18  满意度模拟分布堆叠条
 * ========================================================= */
const CHART_F18 = () => {
  const items = ['展前邀请','注册流程','现场导览','展商质量','观众密度','活动质量','洽谈环境','餐饮交通','线上云展','展后跟进'];
  // 模拟：5/4/3/2/1 占比
  const v5 = [22, 35, 18, 38, 28, 24, 22, 18, 15, 12];
  const v4 = [40, 42, 38, 40, 38, 40, 38, 36, 30, 28];
  const v3 = [25, 18, 28, 16, 22, 22, 24, 28, 32, 32];
  const v2 = [10,  4, 12,  4,  9, 10, 12, 12, 15, 18];
  const v1 = [ 3,  1,  4,  2,  3,  4,  4,  6,  8, 10];
  return {
    ...baseOption('图F18  专业观众满意度模拟分布', '示例数据，真实分布以正式问卷调研结果为准'),
    legend: { top: 56, textStyle: { fontSize: 12 } },
    grid: { left: 100, right: 60, top: 100, bottom: 50 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: p => p.map(x => `${x.seriesName}: ${x.value}%`).join('<br/>') },
    xAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%', color: PALETTE.muted }, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } } },
    yAxis: { type: 'category', data: items, axisLabel: { fontSize: 13, color: PALETTE.ink }, axisTick: { show: false }, axisLine: { show: false } },
    series: [
      { name: '很满意(5)', type: 'bar', stack: 'a', data: v5, itemStyle: { color: '#10B981' }, label: { show: true, formatter: '{c}%', color: '#fff', fontSize: 11 } },
      { name: '满意(4)',   type: 'bar', stack: 'a', data: v4, itemStyle: { color: '#34D399' }, label: { show: true, formatter: '{c}%', color: '#fff', fontSize: 11 } },
      { name: '一般(3)',   type: 'bar', stack: 'a', data: v3, itemStyle: { color: '#FCD34D' }, label: { show: true, formatter: '{c}%', color: '#0F172A', fontSize: 11 } },
      { name: '不满意(2)', type: 'bar', stack: 'a', data: v2, itemStyle: { color: '#FB923C' }, label: { show: true, formatter: '{c}%', color: '#fff', fontSize: 11 } },
      { name: '很不满意(1)', type: 'bar', stack: 'a', data: v1, itemStyle: { color: '#EF4444' }, label: { show: true, formatter: '{c}%', color: '#fff', fontSize: 11 } }
    ]
  };
};

/* =========================================================
 * F19  展会 KPI 仪表盘
 * ========================================================= */
const CHART_F19 = () => {
  const gauges = [
    { title: '专业观众占比', value: 72, target: 80, color: PALETTE.primary },
    { title: '采购决策者占比', value: 38, target: 50, color: PALETTE.accent },
    { title: '展商满意度', value: 84, target: 90, color: PALETTE.success },
    { title: '观众满意度', value: 78, target: 85, color: '#8B5CF6' },
    { title: '复展意愿', value: 81, target: 90, color: '#06B6D4' },
    { title: '数字平台使用率', value: 46, target: 70, color: '#EC4899' }
  ];
  return {
    ...baseOption('图F19  中国制博会核心 KPI 仪表盘（示例）', '当前值 vs 目标值；具体数值待问卷调研后回填'),
    series: gauges.map((g, i) => {
      const cx = 12 + (i % 3) * 28;
      const cy = i < 3 ? 32 : 70;
      return {
        type: 'gauge',
        center: [`${cx}%`, `${cy}%`],
        radius: '22%',
        startAngle: 200, endAngle: -20,
        min: 0, max: 100,
        splitNumber: 5,
        progress: { show: true, width: 12, itemStyle: { color: g.color } },
        axisLine: { lineStyle: { width: 12, color: [[1, '#E5E7EB']] } },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { distance: -16, length: 6, lineStyle: { color: '#fff', width: 2 } },
        axisLabel: { show: false },
        anchor: { show: false },
        title: { show: true, offsetCenter: [0, '-20%'], color: PALETTE.muted, fontSize: 12 },
        detail: { show: true, offsetCenter: [0, '0%'], formatter: '{value}%', color: g.color, fontSize: 22, fontWeight: 700 },
        data: [{ value: g.value, name: g.title }]
      };
    }).concat(gauges.map((g, i) => {
      const cx = 12 + (i % 3) * 28;
      const cy = i < 3 ? 32 : 70;
      return {
        type: 'gauge',
        center: [`${cx}%`, `${cy}%`],
        radius: '22%',
        startAngle: 200, endAngle: -20,
        min: 0, max: 100,
        progress: { show: false },
        axisLine: { show: false },
        pointer: { show: true, length: '60%', width: 3, itemStyle: { color: PALETTE.danger } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: true, size: 8, itemStyle: { color: PALETTE.danger } },
        detail: { show: true, offsetCenter: [0, '32%'], formatter: `目标 ${g.target}%`, color: PALETTE.muted, fontSize: 11 },
        data: [{ value: g.target }]
      };
    }))
  };
};

/* =========================================================
 * F20  沈阳工业文旅联动路线（示意）
 * ========================================================= */
const CHART_F20 = () => {
  // 不依赖城市底图，用相对坐标做示意路线
  const points = [
    { name: '沈阳国际展览中心', value: [50, 50, 100], type: 'core', tag: '主会场' },
    { name: '中国工业博物馆', value: [25, 65, 70], tag: '工业文化' },
    { name: '沈阳机床集团', value: [15, 35, 70], tag: '工业母机' },
    { name: '沈阳新松机器人', value: [35, 18, 70], tag: '机器人' },
    { name: '宝马沈阳工厂', value: [70, 28, 70], tag: '汽车制造' },
    { name: '沈飞航空博览园', value: [82, 50, 70], tag: '航空装备' },
    { name: '东北大学', value: [70, 80, 70], tag: '产学研' },
    { name: '沈阳故宫', value: [40, 82, 60], tag: '城市文化' },
    { name: '老北市', value: [25, 80, 55], tag: '夜经济' }
  ];
  const center = points[0].value;
  return {
    ...baseOption('图F20  沈阳工业文旅联动路线示意', '展馆-工厂-高校-文化场所组合体验，提升城市产业品牌形象'),
    grid: { left: 0, right: 0, top: 80, bottom: 0, containLabel: false },
    xAxis: { show: false, min: 0, max: 100, type: 'value' },
    yAxis: { show: false, min: 0, max: 100, type: 'value' },
    tooltip: { trigger: 'item', formatter: p => p.data.name + (p.data.tag ? '<br/>' + p.data.tag : '') },
    series: [
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        polyline: false,
        effect: { show: true, period: 5, trailLength: 0.4, color: PALETTE.accentSoft, symbolSize: 5 },
        lineStyle: { color: PALETTE.accent, width: 2, opacity: 0.55, curveness: 0.3 },
        data: points.slice(1).map(p => ({ coords: [center.slice(0, 2), p.value.slice(0, 2)] }))
      },
      {
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        symbolSize: d => d[2] * 0.4,
        itemStyle: { color: p => p.data.type === 'core' ? PALETTE.danger : PALETTE.primary, shadowBlur: 10, shadowColor: 'rgba(30, 64, 175, 0.4)' },
        label: {
          show: true,
          formatter: p => `{n|${p.data.name}}\n{t|${p.data.tag}}`,
          position: 'right',
          rich: {
            n: { fontSize: 13, fontWeight: 700, color: PALETTE.ink, lineHeight: 18 },
            t: { fontSize: 11, color: PALETTE.muted, lineHeight: 14 }
          }
        },
        data: points
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        symbolSize: 36,
        rippleEffect: { brushType: 'stroke', scale: 4 },
        itemStyle: { color: PALETTE.danger },
        data: [{ name: '主会场', value: center }]
      }
    ]
  };
};

// 注册新增图表
Object.assign(window.CHART_BUILDERS, {
  F1: CHART_F1,
  F13: CHART_F13,
  F14: CHART_F14,
  F15: CHART_F15,
  F16: CHART_F16,
  F17: CHART_F17,
  F18: CHART_F18,
  F19: CHART_F19,
  F20: CHART_F20
});

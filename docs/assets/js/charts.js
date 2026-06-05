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
  ...baseOption('图F2  第二十三届中国制博会12个专业展区构成', '基于产业链结构的相对推算占比，最终以官方数据为准'),
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
 * F4  功能阶段演进甘特图（与 F1 错位）
 * ========================================================= */
const CHART_F4 = () => {
  const phases = [
    { name: '规模扩张阶段', startYear: 2002, endYear: 2011, color: PALETTE.primary,
      desc: '解决"有没有"的问题', features: ['吸引企业参展', '扩充展位规模', '建立基础品牌'] },
    { name: '产业深化阶段', startYear: 2012, endYear: 2020, color: PALETTE.accent,
      desc: '解决"专不专"的问题', features: ['12个专业展区', '机床/机器人/自动化分区', '同期论坛体系'] },
    { name: '平台升级阶段', startYear: 2021, endYear: 2026, color: PALETTE.success,
      desc: '解决"强不强"的问题', features: ['数字化云展', '智能制造主题', '产业链服务'] }
  ];
  const milestones = [
    { year: 2002, label: '首届创办' },
    { year: 2010, label: '首破万㎡' },
    { year: 2015, label: '机器人展区设立' },
    { year: 2020, label: '线上云展上线' },
    { year: 2023, label: '新质生产力主题' },
    { year: 2025, label: '第23届' }
  ];
  return {
    ...baseOption('图F4  中国制博会功能阶段演进', '从规模扩张到产业深化再到平台升级三阶段'),
    grid: { left: 130, right: 60, top: 90, bottom: 80, containLabel: false },
    xAxis: {
      type: 'value', min: 2001, max: 2027, interval: 2,
      axisLabel: { formatter: '{value}', color: PALETTE.muted, fontSize: 12 },
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    yAxis: {
      type: 'category', data: phases.map(p => p.name),
      axisTick: { show: false }, axisLine: { show: false },
      axisLabel: { fontSize: 13, color: PALETTE.ink, fontWeight: 600 }
    },
    tooltip: { formatter: p => p.data.tip || '' },
    series: [
      // 主条形
      {
        type: 'custom',
        renderItem: (params, api) => {
          const idx = params.dataIndex;
          const p = phases[idx];
          const c1 = api.coord([p.startYear, idx]);
          const c2 = api.coord([p.endYear, idx]);
          const h = api.size([0, 1])[1] * 0.55;
          return {
            type: 'group',
            children: [
              { type: 'rect',
                shape: { x: c1[0], y: c1[1] - h / 2, width: c2[0] - c1[0], height: h, r: 8 },
                style: { fill: p.color, opacity: 0.9 } },
              { type: 'text',
                style: { text: p.desc, x: c1[0] + 12, y: c1[1] - 8, fill: '#fff', font: 'bold 13px Microsoft YaHei' } },
              { type: 'text',
                style: { text: p.features.join(' · '), x: c1[0] + 12, y: c1[1] + 8, fill: 'rgba(255,255,255,0.85)', font: '11px Microsoft YaHei' } }
            ]
          };
        },
        data: phases.map((p, i) => ({ value: [i], tip: `${p.name}（${p.startYear}-${p.endYear}）<br/>${p.desc}` }))
      },
      // 关键节点
      {
        type: 'scatter',
        data: milestones.map(m => ({
          value: [m.year, -0.7],
          name: m.label,
          itemStyle: { color: PALETTE.danger, borderColor: '#fff', borderWidth: 2 }
        })),
        symbol: 'pin', symbolSize: 28,
        label: {
          show: true, position: 'bottom', distance: 8,
          formatter: p => `${p.data.name}\n${p.value[0]}`,
          fontSize: 10, color: PALETTE.ink, lineHeight: 14
        }
      }
    ]
  };
};


/* =========================================================
 * F5  九大问题影响-紧迫性背靠背条形
 * ========================================================= */
const CHART_F5 = () => {
  const cats = [
    '战略定位表达', '专业观众组织', '数字化服务闭环', '宣传推广分层', '展区活动联动',
    '国际化深度', '现场服务体验', '展后转化机制', '高校与青年参与'
  ];
  // 影响（左侧负值显示）/ 紧迫性（右侧）
  const impact   = [4, 5, 5, 4, 4, 3, 3, 5, 3];
  const urgency  = [4, 5, 4, 3, 4, 3, 4, 5, 3];
  return {
    ...baseOption('图F5  九大问题影响×紧迫性背靠背评估', '左侧蓝条：影响程度（1-5）；右侧橙条：改进紧迫性（1-5）'),
    grid: { left: 30, right: 30, top: 110, bottom: 50, containLabel: true },
    legend: { top: 64, textStyle: { fontSize: 12 } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: p => p.map(x => `${x.seriesName}: ${Math.abs(x.value)}`).join('<br/>') },
    xAxis: {
      type: 'value',
      min: -5, max: 5,
      interval: 1,
      axisLabel: { formatter: v => Math.abs(v), color: PALETTE.muted },
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: cats,
      position: 'left',
      axisLabel: { fontSize: 13, color: PALETTE.ink, fontWeight: 500 },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: PALETTE.line } }
    },
    series: [
      {
        name: '影响程度', type: 'bar',
        data: impact.map(v => -v),
        itemStyle: { color: PALETTE.primary, borderRadius: [8, 0, 0, 8] },
        barWidth: 18,
        label: { show: true, position: 'left', color: PALETTE.primary, fontWeight: 600, formatter: p => Math.abs(p.value) }
      },
      {
        name: '改进紧迫性', type: 'bar',
        data: urgency,
        itemStyle: { color: PALETTE.accent, borderRadius: [0, 8, 8, 0] },
        barWidth: 18,
        label: { show: true, position: 'right', color: PALETTE.accent, fontWeight: 600 }
      }
    ]
  };
};


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
 * 横轴 = 可行性 (value[0])
 * 纵轴 = 影响     (value[1])
 * 大小 = 综合优先级 (value[2])
 * ========================================================= */
const CHART_F7 = () => {
  // [可行性, 影响, 综合优先级]
  const data = [
    { name: '观众精准组织',     value: [4.2, 4.5, 36] },
    { name: '数字化全流程平台', value: [3.6, 4.7, 40] },
    { name: '展后转化机制',     value: [4.4, 4.3, 30] },
    { name: '主题活动链条',     value: [4.5, 3.8, 24] },
    { name: '明确平台定位',     value: [4.6, 4.0, 28] },
    { name: '分层传播体系',     value: [4.3, 3.6, 22] },
    { name: '现场服务升级',     value: [4.4, 3.5, 26] },
    { name: '国际采购组织',     value: [3.2, 3.9, 24] },
    { name: '产教融合',         value: [4.0, 3.4, 22] },
    { name: '绿色低碳会展',     value: [4.1, 3.0, 18] },
    { name: '场景分区',         value: [3.8, 3.7, 22] }
  ];
  return {
    ...baseOption('图F7  优化建议影响×可行性四象限矩阵', '横轴：可行性 1-5；纵轴：影响 1-5；气泡大小：综合优先级（百分制）'),
    grid: { left: 80, right: 40, top: 96, bottom: 70 },
    xAxis: {
      name: '实施可行性 →', nameLocation: 'end', nameGap: 18,
      nameTextStyle: { color: PALETTE.muted, fontSize: 12 },
      min: 2.5, max: 5,
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } },
      axisLabel: { color: PALETTE.muted }
    },
    yAxis: {
      name: '项目影响 ↑',
      nameTextStyle: { color: PALETTE.muted, fontSize: 12 },
      min: 2.5, max: 5,
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } },
      axisLabel: { color: PALETTE.muted }
    },
    tooltip: {
      formatter: p =>
        `<b>${p.data.name}</b><br/>` +
        `可行性: ${p.data.value[0]} / 5<br/>` +
        `影响:   ${p.data.value[1]} / 5<br/>` +
        `综合优先级: ${p.data.value[2]}`
    },
    graphic: [
      // 四个象限的标签
      { type: 'text', right: 60, top: 110,
        style: { text: '高影响\n高可行 ★', textAlign: 'right',
                 fill: 'rgba(30,64,175,0.55)', font: 'bold 13px Microsoft YaHei' } },
      { type: 'text', left: 90, top: 110,
        style: { text: '高影响\n低可行', textAlign: 'left',
                 fill: 'rgba(245,158,11,0.55)', font: 'bold 13px Microsoft YaHei' } },
      { type: 'text', right: 60, bottom: 90,
        style: { text: '低影响\n高可行', textAlign: 'right',
                 fill: 'rgba(16,185,129,0.55)', font: 'bold 13px Microsoft YaHei' } },
      { type: 'text', left: 90, bottom: 90,
        style: { text: '低影响\n低可行', textAlign: 'left',
                 fill: 'rgba(100,116,139,0.55)', font: 'bold 13px Microsoft YaHei' } }
    ],
    series: [
      {
        type: 'scatter',
        symbolSize: d => d[2],
        data,
        itemStyle: {
          color: p => {
            const [fea, imp] = p.data.value;  // [可行性, 影响]
            if (imp >= 4 && fea >= 4) return PALETTE.primary;
            if (imp >= 4) return PALETTE.accent;
            if (fea >= 4) return PALETTE.success;
            return PALETTE.muted;
          },
          opacity: 0.88,
          borderColor: '#fff', borderWidth: 2
        },
        label: { show: true, formatter: p => p.data.name, position: 'top', color: PALETTE.ink, fontSize: 11, fontWeight: 500 }
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
 * F9  五阶段实施甘特（以周为单位）
 * ========================================================= */
const CHART_F9 = () => {
  // T 表示开幕周；总长 65 周（约 15 个月）
  // 单位：周
  const stages = [
    { name: '第一阶段 主题与招商基础', sub: '统一定位/招商手册/数据采集表', start: 0,  dur: 13, color: PALETTE.primary },
    { name: '第二阶段 供需匹配数据库', sub: '采购商邀请/展商画像/活动设计', start: 13, dur: 13, color: PALETTE.primaryLight },
    { name: '第三阶段 数字化与传播',    sub: '预约洽谈/数字导览/分层传播',    start: 26, dur: 13, color: PALETTE.accent },
    { name: '第四阶段 展中运营',         sub: '现场导览/活动链/数据记录',      start: 39, dur: 1,  color: PALETTE.danger },
    { name: '第五阶段 展后转化',         sub: '1/3/6 个月线索回访/复盘报告',   start: 40, dur: 26, color: PALETTE.success }
  ];
  return {
    ...baseOption('图F9  优化建议五阶段实施甘特图', '横轴单位：周；T = 开幕周（约第 39 周）'),
    grid: { left: 230, right: 60, top: 90, bottom: 60 },
    xAxis: {
      type: 'value',
      min: 0, max: 66,
      interval: 13,
      axisLabel: {
        color: PALETTE.muted, fontSize: 11,
        formatter: v => v < 39 ? `T-${39 - v}周` : (v === 39 ? 'T(开幕)' : `T+${v - 39}周`)
      },
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: stages.map(s => s.name).reverse(),
      axisTick: { show: false }, axisLine: { show: false },
      axisLabel: { fontSize: 12, color: PALETTE.ink, fontWeight: 600 }
    },
    tooltip: { formatter: p => p.data.tip || '' },
    series: [{
      type: 'custom',
      renderItem: (params, api) => {
        const reversed = stages.slice().reverse();
        const idx = params.dataIndex;
        const s = reversed[idx];
        const c1 = api.coord([s.start, idx]);
        const c2 = api.coord([s.start + s.dur, idx]);
        const h = api.size([0, 1])[1] * 0.5;
        return {
          type: 'group',
          children: [
            { type: 'rect',
              shape: { x: c1[0], y: c1[1] - h / 2, width: Math.max(c2[0] - c1[0], 6), height: h, r: 6 },
              style: { fill: s.color, opacity: 0.92 } },
            { type: 'text',
              style: {
                text: `${s.dur} 周  ·  ${s.sub}`,
                x: c1[0] + 10, y: c1[1] - 6,
                fill: '#fff', font: 'bold 12px Microsoft YaHei',
                verticalAlign: 'middle'
              } }
          ]
        };
      },
      data: stages.slice().reverse().map((s, i) => ({ value: [i], tip: `${s.name}<br/>持续 ${s.dur} 周<br/>${s.sub}` }))
    }],
    // 开幕日竖线
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
  if (!window.echarts) {
    dom.innerHTML = '<div class="chart-error">图表库未能加载，请刷新页面或检查 assets/js/echarts.min.js 是否存在。</div>';
    return null;
  }
  if (!window.CHART_BUILDERS || typeof window.CHART_BUILDERS[code] !== 'function') {
    dom.innerHTML = `<div class="chart-error">未找到 ${code} 图表配置。</div>`;
    return null;
  }
  try {
    dom.innerHTML = '';
    const chart = echarts.init(dom, null, { renderer: 'canvas' });
    chart.setOption(window.CHART_BUILDERS[code]());
    window.addEventListener('resize', () => chart.resize());
    return chart;
  } catch (err) {
    console.error('[hz] chart render failed', code, err);
    dom.innerHTML = `<div class="chart-error">${code} 图表渲染失败。请刷新页面，或在图表画廊下载静态 PNG。</div>`;
    return null;
  }
};


/* =========================================================
 * F1  规模演进信息图（时间轴 + 疫情注释）
 * ========================================================= */
const CHART_F1 = () => {
  const points = [
    { year: 2002, area: 3,    exhib: 320, intent: 3.2 },
    { year: 2005, area: 5,    exhib: 480, intent: 5.8 },
    { year: 2010, area: 6.5,  exhib: 620, intent: 8.4 },
    { year: 2015, area: 8,    exhib: 780, intent: 11.6 },
    { year: 2020, area: 7,    exhib: 720, intent: 9.2 },
    { year: 2023, area: 8.5,  exhib: 850, intent: 13.5 },
    { year: 2025, area: 9,    exhib: 912, intent: 15.8 }
  ];
  return {
    ...baseOption('图F1  中国制博会规模演进信息图', '展览面积 / 参展企业 / 开幕日意向成交额 三十年趋势'),
    legend: { top: 56, textStyle: { fontSize: 12 } },
    grid: { left: 70, right: 70, top: 100, bottom: 60 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    xAxis: {
      type: 'value',
      min: 2001, max: 2026,
      interval: 5,
      axisLabel: { color: PALETTE.ink, fontSize: 12, formatter: '{value}' },
      axisLine: { lineStyle: { color: PALETTE.line } },
      splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } }
    },
    yAxis: [
      { type: 'value', name: '面积(万㎡) / 意向(亿元)', position: 'left', nameTextStyle: { color: PALETTE.muted }, splitLine: { lineStyle: { color: PALETTE.line, type: 'dashed' } } },
      { type: 'value', name: '参展企业(家)', position: 'right', nameTextStyle: { color: PALETTE.muted }, splitLine: { show: false } }
    ],
    series: [
      {
        name: '展览面积(万㎡)', type: 'line',
        data: points.map(p => [p.year, p.area]),
        smooth: 0.3,
        symbol: 'circle', symbolSize: 10,
        lineStyle: { color: PALETTE.primary, width: 3 },
        itemStyle: { color: PALETTE.primary, borderColor: '#fff', borderWidth: 2 },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(30, 64, 175, 0.35)' }, { offset: 1, color: 'rgba(30, 64, 175, 0.02)' }] } },
        label: { show: true, position: 'top', fontSize: 11, color: PALETTE.primary, formatter: p => p.value[1] + '万㎡' }
      },
      {
        name: '开幕日意向成交额(亿元)', type: 'line',
        data: points.map(p => [p.year, p.intent]),
        smooth: 0.3,
        symbol: 'diamond', symbolSize: 10,
        lineStyle: { color: PALETTE.accent, width: 3 },
        itemStyle: { color: PALETTE.accent, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'bottom', fontSize: 11, color: PALETTE.accent, formatter: p => p.value[1] + '亿' },
        markPoint: {
          symbol: 'pin',
          symbolSize: 60,
          itemStyle: { color: PALETTE.danger },
          data: [{ coord: [2020, 9.2], value: '疫情' }]
        }
      },
      {
        name: '参展企业(家)', type: 'line',
        yAxisIndex: 1,
        data: points.map(p => [p.year, p.exhib]),
        smooth: 0.3,
        symbol: 'rect', symbolSize: 10,
        lineStyle: { color: PALETTE.success, width: 3, type: 'dashed' },
        itemStyle: { color: PALETTE.success, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'top', fontSize: 11, color: PALETTE.success, formatter: p => p.value[1] + '家' }
      }
    ]
  };
};


/* =========================================================
 * F13  沈阳装备制造产业链辐射地图
 * ========================================================= */
const CHART_F13 = () => {
  // 不依赖外部 GeoJSON，用散点连线绘制辐射网络
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
    grid: { left: 40, right: 40, top: 80, bottom: 30, containLabel: false },
    xAxis: { min: 95, max: 135, show: false, type: 'value' },
    yAxis: { min: 18, max: 50, show: false, type: 'value' },
    // 简化中国轮廓
    graphic: [{
      type: 'group', left: 'center', top: 'middle',
      children: [
        { type: 'text',
          style: { text: '中 国\nCHINA', x: 0, y: 0, textAlign: 'center', textVerticalAlign: 'middle',
            fill: '#F1F5F9', font: 'bold 88px Microsoft YaHei' } }
      ]
    }],
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
 * F14  SWOT 战略分析（graphic 重写，避免坐标错位）
 * ========================================================= */
const CHART_F14 = () => {
  const blocks = [
    { quad: 'S', title: '优势 Strengths', color: '#1E40AF', bg: '#EFF6FF', x: '5%', y: '15%',
      items: [
        '国家级专业展会，二十三届持续办展',
        '沈阳与东北装备制造产业基础雄厚',
        '9万㎡规模，912家参展，3056个展位',
        '开幕日意向成交额15.8亿元',
        '12个专业展区覆盖产业链关键环节'
      ] },
    { quad: 'W', title: '劣势 Weaknesses', color: '#92400E', bg: '#FFFBEB', x: '52%', y: '15%',
      items: [
        '战略定位对外表达不够聚焦',
        '专业观众需求采集与匹配机制弱',
        '数字化服务尚未形成全链条闭环',
        '展后转化跟踪不足',
        '宣传分层与新媒体内容偏弱'
      ] },
    { quad: 'O', title: '机会 Opportunities', color: '#065F46', bg: '#ECFDF5', x: '5%', y: '57%',
      items: [
        '制造业智能化转型催生新需求',
        '东北全面振兴战略支持',
        '新质生产力政策红利释放',
        '"一带一路"国际合作机会',
        '沈阳建设国家先进制造业基地'
      ] },
    { quad: 'T', title: '威胁 Threats', color: '#991B1B', bg: '#FEF2F2', x: '52%', y: '57%',
      items: [
        '国内同类展会(CIIF/CIMT)竞争加剧',
        '线上展示和短视频替代部分线下功能',
        '经济周期对企业参展预算的影响',
        '国际地缘政治影响跨境合作',
        '城市会展硬件竞争加剧'
      ] }
  ];
  const graphics = [];
  blocks.forEach(b => {
    graphics.push({
      type: 'group',
      left: b.x, top: b.y,
      children: [
        { type: 'rect', shape: { x: 0, y: 0, width: 720, height: 360, r: 14 },
          style: { fill: b.bg, stroke: b.color, lineWidth: 2 } },
        { type: 'circle', shape: { cx: 50, cy: 50, r: 28 },
          style: { fill: b.color } },
        { type: 'text',
          style: { x: 50, y: 50, text: b.quad, textAlign: 'center', textVerticalAlign: 'middle',
            fill: '#fff', font: 'bold 28px Microsoft YaHei' } },
        { type: 'text',
          style: { x: 96, y: 38, text: b.title, fill: b.color, font: 'bold 24px Microsoft YaHei' } },
        ...b.items.map((t, i) => ([
          { type: 'circle', shape: { cx: 30, cy: 110 + i * 44, r: 4 },
            style: { fill: b.color } },
          { type: 'text',
            style: { x: 46, y: 110 + i * 44, text: t, textVerticalAlign: 'middle',
              fill: '#1F2937', font: '15px Microsoft YaHei' } }
        ])).flat()
      ]
    });
  });
  // 中央十字
  graphics.push({
    type: 'text', left: 'center', top: '50%',
    style: { text: '内\n部 ←—— 外 部', textAlign: 'center', textVerticalAlign: 'middle',
      fill: '#94A3B8', font: '13px Microsoft YaHei' }
  });
  return {
    ...baseOption('图F14  中国制博会 SWOT 战略分析', '内部优劣势 + 外部机会威胁'),
    graphic: graphics
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
        areaStyle: { color: 'rgba(30, 64, 175, 0.45)' },
        lineStyle: { color: PALETTE.primary, width: 4 },
        itemStyle: { color: PALETTE.primary, borderColor: '#fff', borderWidth: 2 },
        symbol: 'circle', symbolSize: 8 },
      { name: 'CIIF 中国国际工业博览会(上海)', value: [5.0, 4.5, 4.5, 4.6, 4.2, 4.7, 5.0, 4.8],
        lineStyle: { color: PALETTE.accent, width: 1.5, type: 'dashed' },
        itemStyle: { color: PALETTE.accent }, symbol: 'none' },
      { name: 'CIMT 中国机床展(北京)', value: [4.7, 4.4, 4.0, 4.0, 3.8, 4.5, 4.8, 4.5],
        lineStyle: { color: PALETTE.success, width: 1.5, type: 'dashed' },
        itemStyle: { color: PALETTE.success }, symbol: 'none' },
      { name: 'CHTF 高交会(深圳)', value: [4.6, 4.0, 4.2, 4.3, 4.5, 3.8, 4.7, 4.6],
        lineStyle: { color: '#8B5CF6', width: 1.5, type: 'dashed' },
        itemStyle: { color: '#8B5CF6' }, symbol: 'none' }
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
 * F18  问卷回填满意度分布堆叠条
 * ========================================================= */
const CHART_F18 = () => {
  const items = ['展前邀请','注册流程','现场导览','展商质量','观众密度','活动质量','洽谈环境','餐饮交通','线上云展','展后跟进'];
  // 问卷回填前的预设分布：5/4/3/2/1 占比
  const v5 = [22, 35, 18, 38, 28, 24, 22, 18, 15, 12];
  const v4 = [40, 42, 38, 40, 38, 40, 38, 36, 30, 28];
  const v3 = [25, 18, 28, 16, 22, 22, 24, 28, 32, 32];
  const v2 = [10,  4, 12,  4,  9, 10, 12, 12, 15, 18];
  const v1 = [ 3,  1,  4,  2,  3,  4,  4,  6,  8, 10];
  return {
    ...baseOption('图F18  专业观众满意度问卷回填分布', '当前为问卷回填口径展示，正式分布以现场调研结果为准'),
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
 * F19  KPI 仪表盘（六个进度环卡片）
 * ========================================================= */
const CHART_F19 = () => {
  const gauges = [
    { title: '专业观众占比',     unit: '%', value: 72, target: 80, color: PALETTE.primary,    icon: '👥' },
    { title: '采购决策者占比',   unit: '%', value: 38, target: 50, color: PALETTE.accent,     icon: '💼' },
    { title: '展商满意度',       unit: '%', value: 84, target: 90, color: PALETTE.success,    icon: '⭐' },
    { title: '观众满意度',       unit: '%', value: 78, target: 85, color: '#8B5CF6',          icon: '😊' },
    { title: '复展意愿',         unit: '%', value: 81, target: 90, color: '#06B6D4',          icon: '🔁' },
    { title: '数字平台使用率',   unit: '%', value: 46, target: 70, color: '#EC4899',          icon: '📱' }
  ];
  const series = [];
  gauges.forEach((g, i) => {
    const cx = 18 + (i % 3) * 32;
    const cy = i < 3 ? 32 : 72;
    series.push({
      type: 'gauge',
      center: [`${cx}%`, `${cy}%`],
      radius: '23%',
      startAngle: 90, endAngle: -270,
      min: 0, max: 100,
      progress: { show: true, roundCap: true, width: 18, itemStyle: { color: g.color } },
      axisLine: { roundCap: true, lineStyle: { width: 18, color: [[1, '#F1F5F9']] } },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      anchor: { show: false },
      title: { show: true, offsetCenter: [0, '110%'], color: PALETTE.muted, fontSize: 13 },
      detail: {
        show: true, offsetCenter: [0, 0],
        formatter: v => `{a|${Math.round(v)}}{b|${g.unit}}\n{c|目标 ${g.target}${g.unit}}`,
        rich: {
          a: { fontSize: 30, fontWeight: 700, color: g.color },
          b: { fontSize: 14, color: PALETTE.muted, padding: [0, 0, 0, 2] },
          c: { fontSize: 11, color: PALETTE.muted, padding: [6, 0, 0, 0] }
        }
      },
      data: [{ value: g.value }]
    });
    // 目标刻度（在外圈画一段窄环表示目标）
    series.push({
      type: 'gauge',
      center: [`${cx}%`, `${cy}%`],
      radius: '28%',
      startAngle: 90, endAngle: -270,
      min: 0, max: 100,
      progress: { show: true, width: 4, itemStyle: { color: PALETTE.danger } },
      axisLine: { lineStyle: { width: 4, color: [[1, 'transparent']] } },
      pointer: { show: false }, axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
      anchor: { show: false }, title: { show: false }, detail: { show: false },
      data: [{ value: g.target }]
    });
  });
  return {
    ...baseOption('图F19  中国制博会核心 KPI 仪表盘', '内环填充：当前值；外圈细弧：目标值（红）'),
    series
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

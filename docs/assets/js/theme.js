/* ============================================================
   ECharts 全局主题：制博会蓝橙主题
   ============================================================ */
(function () {
  const palette = [
    '#1E40AF', '#F59E0B', '#10B981', '#8B5CF6', '#06B6D4',
    '#EC4899', '#F97316', '#3B82F6', '#84CC16', '#EF4444',
    '#A855F7', '#14B8A6'
  ];

  const theme = {
    color: palette,
    backgroundColor: 'transparent',
    textStyle: {
      fontFamily: '"PingFang SC","Microsoft YaHei","Source Han Sans CN",sans-serif',
      color: '#0F172A'
    },
    title: {
      textStyle: { color: '#0F172A', fontWeight: 700, fontSize: 16 },
      subtextStyle: { color: '#64748B', fontSize: 12 }
    },
    legend: {
      textStyle: { color: '#334155', fontSize: 12 },
      itemGap: 14,
      icon: 'roundRect'
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, .92)',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontSize: 12 },
      padding: [10, 14],
      extraCssText: 'box-shadow: 0 8px 24px rgba(15,23,42,.18); border-radius:8px;'
    },
    grid: { left: 56, right: 32, top: 56, bottom: 48, containLabel: true },
    categoryAxis: {
      axisLine: { lineStyle: { color: '#CBD5E1' } },
      axisTick: { show: false },
      axisLabel: { color: '#64748B', fontSize: 11 },
      splitLine: { show: false }
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#64748B', fontSize: 11 },
      splitLine: { lineStyle: { color: '#E2E8F0', type: 'dashed' } }
    },
    radar: {
      axisLine: { lineStyle: { color: '#E2E8F0' } },
      splitLine: { lineStyle: { color: '#E2E8F0' } },
      splitArea: { areaStyle: { color: ['rgba(241,245,249,.4)', 'rgba(255,255,255,0)'] } },
      axisName: { color: '#334155', fontSize: 12 }
    },
    bar: { itemStyle: { borderRadius: [6, 6, 0, 0] } },
    line: { lineStyle: { width: 3 }, symbol: 'circle', symbolSize: 8, smooth: true }
  };

  if (typeof echarts !== 'undefined') {
    echarts.registerTheme('zbo', theme);
  }
  window.ZBO_PALETTE = palette;
})();

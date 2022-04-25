export const initialColumns = {
    OVERVIEW: [
      {binding: 'name', header: 'Name', width: 220, minWidth: 8, allowDragging: false, visible: true},
      {binding: 'open', header: 'Open', format: 'n2', width: 160, minWidth: 8, allowSorting: true, visible: true},
      {
        binding: 'close',
        header: 'Close',
        format: 'n2',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {binding: 'high', header: 'High', format: 'n2', width: 160, minWidth: 8, allowSorting: true, visible: true},
      {binding: 'low', header: 'Low', format: 'n2', width: 160, minWidth: 8, allowSorting: true, visible: true},
      {
        binding: 'chg',
        header: 'Chg.',
        format: 'n2',
        align: 'center',
        width: 280,
        minWidth: 8,
        allowSorting: false,
        visible: true
      },
      {
        binding: 'volume',
        header: 'Volume',
        format: 'n0',
        width: 160,
        minWidth: 8,
        align: 'center',
        allowSorting: true,
        visible: true
      },
      {
        binding: 'time',
        header: 'Time',
        width: 160,
        minWidth: 8,
        format: 'hh:mm:ss',
        align: 'center',
        allowSorting: true,
        visible: true
      },
      {width: '*', minWidth: 8},
    ],
    TECHNICAL: [
      {binding: 'name', header: 'Name', width: 220, allowDragging: false, visible: true},
      {
        binding: 'technicalMinutes15',
        header: '15 Minutes',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowDragging: false,
        visible: true
      },
      {
        binding: 'technicalMinutes30',
        header: '30 Minutes',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'technicalHourly',
        header: 'Hourly',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'technicalWeekly',
        header: 'Weekly',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'technicalMonthly',
        header: 'Monthly',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {width: '*', minWidth: 8},
    ],
    PERFORMANCE: [
      {binding: 'name', header: 'Name', width: 220, allowDragging: false, visible: true},
      {
        binding: 'performanceDaily',
        header: 'Daily',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'performanceWeek',
        header: '1 Week',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'performanceMonth',
        header: '1 Month',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'performanceYtd',
        header: 'YTD',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'performanceYear',
        header: '1 Year',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {
        binding: 'performanceYear3',
        header: '3 Years',
        format: 'n0',
        width: 160,
        minWidth: 8,
        allowSorting: true,
        visible: true
      },
      {width: '*', minWidth: 8},
    ],
  };

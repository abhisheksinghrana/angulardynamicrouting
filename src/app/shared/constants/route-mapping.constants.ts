export const RouteMappingConstants = {
  expenseTrackerTab: {
    id: 'expenseTrackerTab',
    name: 'Expense Tracker',
    route: '/expensetracker',
    path: 'expensetracker',
    loadChildren:
      'app/home/expense-tracker/expense-tracker.module#ExpenseTrackerModule'
  },
  leaveTrackerTab: {
    id: 'leaveTrackerTab',
    name: 'Leave Tracker',
    route: '/leavetracker',
    path: 'leavetracker',
    loadChildren:
      'app/home/leave-tracker/leave-tracker.module#LeaveTrackerModule'
  },
  timeManagementTab: {
    id: 'timeManagementTab',
    name: 'Time Management',
    route: '/timemanagement',
    path: 'timemanagement',
    loadChildren:
      'app/home/time-management/time-management.module#TimeManagementModule'
  },
  workDaysTab: {
    id: 'workDaysTab',
    name: 'Work Days',
    route: '/workdays',
    path: 'workdays',
    loadChildren: 'app/home/workdays/workdays.module#WorkdaysModule'
  },
  sourceTab: {
    id: 'sourceTab',
    name: 'Source',
    route: '/source',
    path: 'source',
    loadChildren: 'app/home/source/source.module#SourceModule'
  },
  'expenseTrackerTab-categories': {
    id: 'expenseTrackerTab-categories',
    name: 'Categories',
    route: '/categories',
    path: 'categories',
    loadChildren:
      'app/home/expense-tracker/expense-categories/expense-categories.module#ExpenseCategoriesModule'
  },
  'leaveTrackerTab-categories': {
    id: 'leaveTrackerTab-categories',
    name: 'Categories',
    route: '/categories',
    path: 'categories',
    loadChildren:
      'app/home/leave-tracker/leave-categories/leave-categories.module#LeaveCategoriesModule'
  },
  'timeManagementTab-loggingWork': {
    id: 'timeManagementTab-loggingWork',
    name: 'Logging work',
    route: '/loggingwork',
    path: 'loggingwork',
    loadChildren:
      'app/home/time-management/logging-work/logging-work.module#LoggingWorkModule'
  },
  'timeManagementTab-categories': {
    id: 'timeManagementTab-categories',
    name: 'Categories',
    route: '/categories',
    path: 'categories',
    loadChildren:
      'app/home/time-management/time-categories/time-categories.module#TimeCategoriesModule'
  },
  'timeManagementTab-internalCategories': {
    id: 'timeManagementTab-internalCategories',
    name: 'Internal',
    route: '/internalcategories',
    path: 'internalcategories',
    loadChildren:
      'app/home/time-management/internal-categories/internal-categories.module#InternalCategoriesModule'
  },
  'expenseTrackerTab-workflow': {
    id: 'expenseTrackerTab-workflow',
    name: 'Workflow',
    route: '/workflow',
    path: 'workflow',
    loadChildren: 'app/home/workflow/workflow.module#WorkflowModule'
  },
  'leaveTrackerTab-workflow': {
    id: 'leaveTrackerTab-workflow',
    name: 'Workflow',
    route: '/workflow',
    path: 'workflow',
    loadChildren: 'app/home/workflow/workflow.module#WorkflowModule'
  },
  'timeManagementTab-workflow': {
    id: 'timeManagementTab-workflow',
    name: 'Workflow',
    route: '/workflow',
    path: 'workflow',
    loadChildren: 'app/home/workflow/workflow.module#WorkflowModule'
  },
  'expenseTrackerTab-sourceSettings': {
    id: 'expenseTrackerTab-sourceSettings',
    name: 'Source settings',
    route: '/sourcesettings',
    path: 'sourcesettings',
    loadChildren:
      'app/home/source-settings/source-settings.module#SourceSettingsModule'
  },
  'leaveTrackerTab-sourceSettings': {
    id: 'leaveTrackerTab-sourceSettings',
    name: 'Source settings',
    route: '/sourcesettings',
    path: 'sourcesettings',
    loadChildren:
      'app/home/source-settings/source-settings.module#SourceSettingsModule'
  },
  'timeManagementTab-sourceSettings': {
    id: 'timeManagementTab-sourceSettings',
    name: 'Source settings',
    route: '/sourcesettings',
    path: 'sourcesettings',
    loadChildren:
      'app/home/source-settings/source-settings.module#SourceSettingsModule'
  },
  'sourceTab-sourceSettings': {
    id: 'sourceTab-sourceSettings',
    name: 'Source settings',
    route: '/sourcesettings',
    path: 'sourcesettings',
    loadChildren:
      'app/home/source-settings/source-settings.module#SourceSettingsModule'
  },
  'workDaysTab-holidayLeaves': {
    id: 'workDaysTab-holidayLeaves',
    name: 'Holiday leaves',
    route: '/holidayleaves',
    path: 'holidayleaves',
    loadChildren:
      'app/home/holiday-leaves/holiday-leaves.module#HolidayLeavesModule'
  },
  'workDaysTab-workingHours': {
    id: 'workDaysTab-workingHours',
    name: 'Working hours',
    route: '/workinghours',
    path: 'workinghours',
    loadChildren:
      'app/home/working-hours/working-hours.module#WorkingHoursModule'
  }
};

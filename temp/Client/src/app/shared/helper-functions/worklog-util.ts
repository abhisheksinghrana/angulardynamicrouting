import { WorklogItemColorClassConstants } from '../constants/worklog-item-color-class.constants';

export function getWorklogClass(
  workLogItemType: number,
  workItemType?: string
) {
  const workLogClasses = {
    1: getWorkItemClass(workItemType),
    2: WorklogItemColorClassConstants.internal,
    3: WorklogItemColorClassConstants.actionPoint
  };
  return workLogClasses[workLogItemType] || '';
}

export function getWorkItemClass(workItemType) {
  const workItemClasses = {
    Bug: WorklogItemColorClassConstants.bug,
    'User Story': WorklogItemColorClassConstants.userStory,
    Task: WorklogItemColorClassConstants.task,
    Feature: WorklogItemColorClassConstants.feature,
    Capability: WorklogItemColorClassConstants.capability,
    Epic: WorklogItemColorClassConstants.epic,
    Goal: WorklogItemColorClassConstants.goal
  };
  return workItemClasses[workItemType] || '';
}

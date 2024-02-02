import { trigger } from '@mops-4.0/event-bus'
import i18n from "i18next";

i18n.loadNamespaces('mops.web.cms')
import './eventListener'

import { openAlerts, openConditionRules, openEquipmentStorageTanks, openNotificationTemplates } from './store/alert/actions';


trigger({
  type: 'REGISTER_COMPONENT',
  payload: {
    module: 'cms',
    components: [
      {
        exposedModule: './AlertView',
        displayName: 'mops.web.dir:entityTypeView.alertView'
      }
    ]
  }
})

trigger({
  type: 'REGISTER_DIRECTORY_VIEW',
  payload: {
    exposedModule: './AlertView',
    module: 'cms',
    displayName: 'mops.web.dir:entityTypeView.alertView'
  }
})

trigger({
  type: 'REGISTER_SETTING',
  payload: {
    module: 'cms',
    displayName: 'Condition Monitoring System',
    sequence: 500,
    settings: [
      {
        displayName: 'Alerts',
        sequence: 100,
        action: () => trigger(openAlerts())
      },
      {
        displayName: 'Condition Rules',
        sequence: 110,
        action: () => trigger(openConditionRules())
      },
      {
        displayName: 'Equipment > Storage Tanks',
        sequence: 120,
        action: () => trigger(openEquipmentStorageTanks())
      },
      {
        displayName: 'Notification Templates',
        sequence: 130,
        action: () => trigger(openNotificationTemplates())
      }
    ]
  }
})

export default {}

import { THEME_ENUM } from 'constants/theme.constant'

export const themeConfig = {
    themeColor: 'green',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    primaryColorLevel: 600,
    cardBordered: true,
    panelExpand: false,
    controlSize: 'sm',
    navMode: THEME_ENUM.NAV_MODE_LIGHT,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_MODERN,
        sideNavCollapse: false,
    },
}


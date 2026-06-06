
const CONFIG_NAME   = 'config_battle.json';
const pluginVersion = Imported ? Imported.MK_UICustomizer_Battle : '1.0.0';
const edition       = window.opener ? window.opener.MK_UICustomizer_Battle.edition : 'pro';

function onSave() {
    writeFile('uicustom/' + CONFIG_NAME, config);

    UICustom.refreshBattle(config);
}

if (window.opener) {
    $(document).ready(() => fetchLatestVersion(pluginVersion, data => data.latestVersionBattle));
    $(document).ready(() => checkPotentialPluginConflicts());
}

$(document).ready(() => {
    $(edition == 'lite' ? '.pro' : '.lite').hide();
});

function checkPotentialPluginConflicts() {
    toggleVisibility('#notUsingSvBattleWarning',                !window.opener.$gameSystem.isSideView());
    toggleVisibility('#compatibilityWarning',                   Imported.VisuMZ_1_BattleCore);
    toggleVisibility('#visustellaCustomActorCommandsWarning',   Imported.VisuMZ_1_BattleCore);
    toggleVisibility('#VisustellaGaugesCompatibilityWarning',   Imported.VisuMZ_1_SkillsStatesCore);
    toggleVisibility('#mogBattleHudWarning',                    hasPlugin('MOG_BattleHud'));
};

const getTemplate = (name) => {
    if (name == 'rows') {
        return ({
            "skillItemListPositionMode": "screen",
            "skillItemListOrigin": "topLeft",
            "skillItemListOrigin2": "topLeft",
            "skillItemListWidth": 760,
            "skillItemListColumns": 2,
            "partyStatusWidth": 760,
            "partyStatusDimensionsMode": "overall",
            "actorPortraitMaxHeight": 40,
            "actorPortraitPosition": "middleLeft",
            "hpGaugePosition": "middleRight",
            "mpGaugePosition": "middleRight",
            "tpGaugePosition": "middleRight",
            "atbGaugePosition": "bottomLeft",
            "atbGaugeOffsetY": -2,
            "skillItemListPosition": "bottomRight",
            "partyCommandsWidth": 220,
            "actorCommandsWidth": 220,
            "actorCommandsOrigin": "bottomLeft",
            "actorCommandsOrigin2": "topLeft",
            "enemyWindowWidth": 760,
            "enemyWindowPositionMode": "screen",
            "enemyWindowPosition": "bottomRight",
            "partyStatusOrientation": "rows",
            "partyStatusPosition": "bottomRight",
            "partyCommandsPosition": "bottomLeft",
            "actorCommandsPositionMode": "screen",
            "actorCommandsPosition": "bottomLeft",
            "partyStatusHeight": 185,
            "whenOpenSkillListThenActorCommands": "stayOpen",
            "whenSelectEnemyThenActorCommands": "stayOpen",
            "whenSelectEnemyThenSkillItemList": "close",
            "actorNameVertAlign": "bottom",
            "actorNameBackgroundType": "none",
            "partyStatusItemBackgroundType": "none",
            "hpGaugeOffsetX": -280,
            "partyCommandsNumber": 4,
            "actorPortraitMode": "face",
            "hpGaugeWidth": 200,
            "mpGaugeWidth": 120,
            "tpGaugeWidth": 120,
            "mpGaugeOffsetX": -140,
            "atbGaugeOffsetX": 4,
            "atbGaugeWidth": 220,
            "actorStatePosition": "middleRight",
            "actorStateOffsetX": -470,
            "hpGaugeHeight": 24,
            "mpGaugeHeight": 24,
            "tpGaugeHeight": 24,
            "partyCommandsTextAlign": "left",
            "actorCommandsTextAlign": "left",
            "actorNameOffsetX": 138
            });
    }
    if (name == 'sideView') {
        return ({
            "skillItemListPositionMode": "actorCommands",
            "skillItemListOrigin": "topLeft",
            "skillItemListOrigin2": "topLeft",
            "skillItemListWidth": 400,
            "skillItemListColumns": 1,
            "partyStatusWidth": 200,
            "partyStatusDimensionsMode": "cell",
            "actorPortraitMaxHeight": 100,
            "actorPortraitPosition": "topCenter",
            "actorPortraitOffsetY": 30,
            "hpGaugePosition": "bottomLeft",
            "mpGaugePosition": "bottomCenter",
            "tpGaugePosition": "bottomRight",
            "hpGaugeOffsetY": -60,
            "mpGaugeOffsetY": -32,
            "tpGaugeOffsetY": -4,
            "atbGaugePosition": "topCenter",
            "atbGaugeOffsetY": 6,
            "skillItemListPosition": "bottomCenter",
            "partyCommandsWidth": 200,
            "actorCommandsWidth": 206,
            "actorCommandsOrigin": "middleCenter",
            "actorCommandsOrigin2": "middleRight",
            "enemyWindowWidth": 300,
            "enemyWindowPositionMode": "screen",
            "enemyWindowPosition": "middleLeft",
            "partyStatusOrientation": "rows",
            "partyStatusPosition": "topRight",
            "partyStatusHeight": 140,
            "partyStatusMinActors": 1,
            "partyStatusMaxActors": 4,
            "actorPortraitMode": "none",
            "partyStatusItemSpacing": 8,
            "hpGaugeOffsetX": 4,
            "tpGaugeOffsetX": -6,
            "actorCommandsPositionMode": "battler",
            "enemyWindowColumns": 1,
            "whenSelectEnemyThenPartyStatus": "stayOpen",
            "whenSelectEnemyThenActorCommands": "stayOpen",
            "whenSelectEnemyThenSkillItemList": "stayOpen",
            "whenOpenSkillListThenPartyStatus": "stayOpen",
            "whenOpenSkillListThenActorCommands": "stayOpen",
            "whenSelectActorThenActorCommands": "close",
            "whenSelectActorThenSkillItemList": "close",
            "skillItemListOffsetX": 20,
            "skillItemListOffsetY": 20,
            "partyStatusOffsetY": 30,
            "helpWindowPosition": "bottomCenter",
            "helpWindowWidth": 900,
            "partyStatusItemBackgroundType": "none",
            "partyStatusShowFrame": false,
            "partyStatusBackgroundType": "window",
            "hpGaugeWidth": 160,
            "mpGaugeWidth": 160,
            "atbGaugeWidth": 180,
            "tpGaugeWidth": 160,
            "partyStatusNoCursor": true,
            "partyStatusMode": "splitted",
            "partyStatusGapY": 0,
            "partyStatusDashHorz": -40,
            "defaultWindowDashSpeed": 3,
            "actorCommandsDashHorz": 50,
            "skillItemListDashHorz": 50,
            "enemyWindowDashHorz": -50
        });
    }
    return ({
        "skillItemListPositionMode": "screen",
        "skillItemListOrigin": "topLeft",
        "skillItemListOrigin2": "topLeft",
        "skillItemListWidth": 800,
        "skillItemListColumns": 2,
        "partyStatusWidth": 800,
        "partyStatusDimensionsMode": "overall",
        "actorPortraitMaxHeight": 90,
        "actorPortraitPosition": "topCenter",
        "actorPortraitOffsetY": 4,
        "hpGaugePosition": "bottomCenter",
        "mpGaugePosition": "bottomLeft",
        "tpGaugePosition": "bottomRight",
        "hpGaugeOffsetY": -34,
        "mpGaugeOffsetY": -4,
        "tpGaugeOffsetY": -4,
        "atbGaugePosition": "bottomCenter",
        "atbGaugeOffsetY": -68,
        "skillItemListPosition": "bottomCenter",
        "partyCommandsWidth": 250,
        "actorCommandsWidth": 206,
        "actorCommandsOrigin": "bottomLeft",
        "actorCommandsOrigin2": "topLeft",
        "enemyWindowWidth": 800,
        "enemyWindowPositionMode": "screen",
        "enemyWindowPosition": "bottomCenter",
        "atbGaugeWidth": 184,
        "hpGaugeWidth": 184,
        "mpGaugeWidth": 90,
        "tpGaugeWidth": 80,
        "hpGaugeShowMaxValues": "true",
        "mpGaugeShowMaxValues": "false",
        "tpGaugeShowMaxValues": "false",
        "tpGaugeOffsetX": -4,
        "mpGaugeOffsetX": 4,
        "partyStatusHeight": 180,
        "actorNameVertAlign": "bottom",
        "actorNameOffsetY": -68,
        "actorNameOffsetX": 4
    });
}

function syncFormInputs() {
    
    // Party Status
    toggleButtons(
        '#partyStatusOrientation',
        ['rows', 'columns'],
        config.partyStatusOrientation || 'columns',
    );
    toggleButtons(
        '#partyStatusMode',
        ['singleWindow', 'splitted'],
        config.partyStatusMode || 'singleWindow',
    );

    toggleVisibility('#partyStatusSplittedLayoutBox',   config.partyStatusMode == 'splitted');
    toggleEnable('#partyStatusDimensionsByOverall',     config.partyStatusMode != 'splitted');
    toggle9DirButtons('#partyStatusPosition',           config.partyStatusPosition || 'bottomCenter');

    partyStatusOffsetX.value    = config.partyStatusOffsetX;
    partyStatusOffsetY.value    = config.partyStatusOffsetY;
    partyStatusGapX.value       = config.partyStatusGapX;
    partyStatusGapY.value       = config.partyStatusGapY;
    partyStatusDashHorz.value   = config.partyStatusDashHorz;
    partyStatusDashVert.value   = config.partyStatusDashVert;

    toggleButtons(
        '#partyStatusDimensionsBy',
        ['cell', 'overall'],
        config.partyStatusDimensionsMode || 'cell',
    );
    partyStatusWidth.value      = config.partyStatusWidth;
    partyStatusHeight.value     = config.partyStatusHeight;
    partyStatusMinActors.value  = config.partyStatusMinActors;
    partyStatusMaxActors.value  = config.partyStatusMaxActors;

    // Party Commands
    partyCommandsPositionMode.value = config.partyCommandsPositionMode || 'screen';;
    toggleVisibility('#partyCommandsPositionByScreenBox',       partyCommandsPositionMode.value == 'screen');
    toggleVisibility('#partyCommandsPositionByStatusWindowBox', partyCommandsPositionMode.value != 'screen');

    toggle9DirButtons(
        '#partyCommandsPosition',
        config.partyCommandsPosition || 'topCenter',
    );

    partyCommandsOrigin.value   = config.partyCommandsOrigin;
    partyCommandsOrigin2.value  = config.partyCommandsOrigin2;
    partyCommandsOffsetX.value  = config.partyCommandsOffsetX;
    partyCommandsOffsetY.value  = config.partyCommandsOffsetY;
    partyCommandsWidth.value    = config.partyCommandsWidth;
    partyCommandsNumber.value   = config.partyCommandsNumber;

    // Actor Commands
    actorCommandsPositionMode.value = config.actorCommandsPositionMode || 'statusWindowActorIndex';
    toggleVisibility('#actorCommandsPositionByScreenBox',           actorCommandsPositionMode.value == 'screen');
    toggleVisibility('#actorCommandsPositionByStatusWindowBox',     actorCommandsPositionMode.value != 'screen');

    toggle9DirButtons(
        '#actorCommandsPosition',
        config.actorCommandsPosition || 'middleLeft',
    );

    actorCommandsOrigin.value   = config.actorCommandsOrigin || 'bottomCenter';
    actorCommandsOrigin2.value  = config.actorCommandsOrigin2 || 'topCenter';
    actorCommandsOffsetX.value  = config.actorCommandsOffsetX;
    actorCommandsOffsetY.value  = config.actorCommandsOffsetY;
    actorCommandsWidth.value    = config.actorCommandsWidth;
    actorCommandsNumber.value   = config.actorCommandsNumber;

    // Skill & Item List
    skillItemListPositionMode.value = config.skillItemListPositionMode || 'statusWindowActorIndex';
    toggleVisibility('#skillItemListPositionByScreenBox',       skillItemListPositionMode.value == 'screen');
    toggleVisibility('#skillItemListPositionByStatusWindowBox', skillItemListPositionMode.value != 'screen');

    toggle9DirButtons(
        '#skillItemListPosition',
        config.skillItemListPosition || 'middleLeft',
    );

    skillItemListOrigin.value       = config.skillItemListOrigin || 'bottomCenter';
    skillItemListOrigin2.value      = config.skillItemListOrigin2 || 'topCenter';
    skillItemListOffsetX.value      = config.skillItemListOffsetX;
    skillItemListOffsetY.value      = config.skillItemListOffsetY;
    skillItemListWidth.value        = config.skillItemListWidth;
    skillItemListHeight.value       = config.skillItemListHeight;
    skillItemListLineNumber.value   = config.skillItemListLineNumber;

    toggleButtons(
        '#skillItemListHeightBy',
        ['fixed', 'lineNumber'],
        config.skillItemListHeightMode || 'fixed',
    );
    toggleVisibility('#skillItemListHeightByFixedBox',      config.skillItemListHeightMode != 'lineNumber');
    toggleVisibility('#skillItemListHeightByLineNumberBox', config.skillItemListHeightMode == 'lineNumber');

    toggleButtons(
        '#skillItemListColumns',
        ['1', '2', '3'],
        String(config.skillItemListColumns || 2),
    );

    // Enemy Window
    useEnemyWindow.checked = config.useEnemyWindow !== false;
    toggleVisibility('#enemyWindowBox', useEnemyWindow.checked);

    enemyWindowPositionMode.value = config.enemyWindowPositionMode || 'statusWindowActorIndex';
    toggleVisibility('#enemyWindowPositionByScreenBox',       enemyWindowPositionMode.value == 'screen');
    toggleVisibility('#enemyWindowPositionByStatusWindowBox', enemyWindowPositionMode.value != 'screen');

    toggle9DirButtons(
        '#enemyWindowPosition',
        config.enemyWindowPosition || 'middleLeft',
    );

    enemyWindowOrigin.value       = config.enemyWindowOrigin || 'bottomCenter';
    enemyWindowOrigin2.value      = config.enemyWindowOrigin2 || 'topCenter';
    enemyWindowOffsetX.value      = config.enemyWindowOffsetX;
    enemyWindowOffsetY.value      = config.enemyWindowOffsetY;
    enemyWindowWidth.value        = config.enemyWindowWidth;
    enemyWindowHeight.value       = config.enemyWindowHeight;
    enemyWindowLineNumber.value   = config.enemyWindowLineNumber;

    toggleButtons(
        '#enemyWindowHeightBy',
        ['fixed', 'lineNumber'],
        config.enemyWindowHeightMode || 'fixed',
    );
    toggleVisibility('#enemyWindowHeightByFixedBox',      config.enemyWindowHeightMode != 'lineNumber');
    toggleVisibility('#enemyWindowHeightByLineNumberBox', config.enemyWindowHeightMode == 'lineNumber');

    toggleButtons(
        '#enemyWindowColumns',
        ['1', '2', '3'],
        String(config.enemyWindowColumns || 2),
    );

    // Help Window
    toggle9DirButtons('#helpWindowPosition', config.helpWindowPosition || 'topCenter');
    helpWindowOffsetX.value = config.helpWindowOffsetX;
    helpWindowOffsetY.value = config.helpWindowOffsetY;
    helpWindowWidth.value   = config.helpWindowWidth;

    // Behaviour
    toggleButtons(
        '#whenOpenSkillListThenPartyStatus',
        ['stayOpen', 'close'],
        config.whenOpenSkillListThenPartyStatus || 'close',
    );
    toggleButtons(
        '#whenOpenSkillListThenActorCommands',
        ['stayOpen', 'close'],
        config.whenOpenSkillListThenActorCommands || 'close',
    );
    toggleButtons(
        '#whenSelectEnemyThenPartyStatus',
        ['stayOpen', 'close'],
        config.whenSelectEnemyThenPartyStatus || 'close',
    );
    toggleButtons(
        '#whenSelectEnemyThenActorCommands',
        ['stayOpen', 'close'],
        config.whenSelectEnemyThenActorCommands || 'close',
    );
    toggleButtons(
        '#whenSelectEnemyThenSkillItemList',
        ['stayOpen', 'close'],
        config.whenSelectEnemyThenSkillItemList || 'close',
    );
    toggleButtons(
        '#whenSelectActorThenActorCommands',
        ['stayOpen', 'close'],
        config.whenSelectActorThenActorCommands || 'close',
    );
    toggleButtons(
        '#whenSelectActorThenSkillItemList',
        ['stayOpen', 'close'],
        config.whenSelectActorThenSkillItemList || 'close',
    );
    partyStatusMoveHorz.value = config.partyStatusMoveHorz;
    partyStatusMoveVert.value = config.partyStatusMoveVert;

    // Party Status Window
    partyStatusOpacity.value        = config.partyStatusOpacity;
    partyStatusRowSpacing.value     = config.partyStatusRowSpacing;
    partyStatusColSpacing.value     = config.partyStatusColSpacing;
    partyStatusShowFrame.checked    = !!config.partyStatusShowFrame;
    partyStatusNoCursor.checked     = !!config.partyStatusNoCursor;

    partyStatusBackgroundType.value = config.partyStatusBackgroundType || 'window';
    toggleVisibility('#partyStatusBackgroundFileBox', partyStatusBackgroundType.value == 'image');

    partyStatusItemBackgroundType.value = config.partyStatusItemBackgroundType || 'default';
    toggleVisibility('#partyStatusItemBackgroundFileBox', partyStatusItemBackgroundType.value == 'image');

    // Actor Portrait
    const actorPortraitMode = config.actorPortraitMode || 'face';

    toggleButtons(
        '#actorPortraitMode',
        ['none', 'portrait', 'face'],
        actorPortraitMode,
    );

    toggleVisibility('#actorPortraitBox',           actorPortraitMode != 'none');
    toggleVisibility('#actorCustomPortraitInfoBox', actorPortraitMode == 'portrait');
    toggleVisibility('#actorPortraitAnchorBox',     actorPortraitMode == 'portrait');
    toggleVisibility('#actorPortraitAsFaceBox',     actorPortraitMode == 'face');
    toggleVisibility('#actorPortraitAsCustomBox',   actorPortraitMode == 'portrait');
    
    toggle9DirButtons(
        '#actorPortraitPosition',
        config.actorPortraitPosition || 'topCenter',
    );
    
    actorPortraitAnchor.value       = config.actorPortraitAnchor || 'topCenter';
    actorPortraitOffsetX.value      = config.actorPortraitOffsetX;
    actorPortraitOffsetY.value      = config.actorPortraitOffsetY;
    actorPortraitScale.value        = config.actorPortraitScale;
    actorPortraitMaxWidth.value     = config.actorPortraitMaxWidth;
    actorPortraitMaxHeight.value    = config.actorPortraitMaxHeight;

    actorPortraitKnockoutColorRed.value     = config.actorPortraitKnockoutColorRed;
    actorPortraitKnockoutColorGreen.value   = config.actorPortraitKnockoutColorGreen;
    actorPortraitKnockoutColorBlue.value    = config.actorPortraitKnockoutColorBlue;
    actorPortraitKnockoutColorGrey.value    = config.actorPortraitKnockoutColorGrey;

    // Actor Gauges
    toggle9DirButtons(
        '#atbGaugePosition',
        config.atbGaugePosition || 'bottomCenter',
    );
    atbGaugeOffsetX.value   = config.atbGaugeOffsetX;
    atbGaugeOffsetY.value   = config.atbGaugeOffsetY;
    atbGaugeWidth.value     = config.atbGaugeWidth;
    atbGaugeHeight.value    = config.atbGaugeHeight;

    toggle9DirButtons(
        '#hpGaugePosition',
        config.hpGaugePosition || 'bottomCenter',
        config.hpGaugePosition || 'bottomCenter',
    );
    hpGaugeOffsetX.value        = config.hpGaugeOffsetX;
    hpGaugeOffsetY.value        = config.hpGaugeOffsetY;
    hpGaugeWidth.value          = config.hpGaugeWidth;
    hpGaugeHeight.value         = config.hpGaugeHeight;
    hpGaugeLabelFontSize.value  = config.hpGaugeLabelFontSize;
    hpGaugeLabelY.value         = config.hpGaugeLabelY;
    hpGaugeValueFontSize.value  = config.hpGaugeValueFontSize;
    hpGaugeValueY.value         = config.hpGaugeValueY;
    hpGaugeShowMaxValues.value  = config.hpGaugeShowMaxValues || 'default';

    toggle9DirButtons(
        '#mpGaugePosition',
        config.mpGaugePosition || 'bottomCenter',
        config.mpGaugePosition || 'bottomCenter',
    );
    mpGaugeOffsetX.value        = config.mpGaugeOffsetX;
    mpGaugeOffsetY.value        = config.mpGaugeOffsetY;
    mpGaugeWidth.value          = config.mpGaugeWidth;
    mpGaugeHeight.value         = config.mpGaugeHeight;
    mpGaugeLabelFontSize.value  = config.mpGaugeLabelFontSize;
    mpGaugeLabelY.value         = config.mpGaugeLabelY;
    mpGaugeValueFontSize.value  = config.mpGaugeValueFontSize;
    mpGaugeValueY.value         = config.mpGaugeValueY;
    mpGaugeShowMaxValues.value  = config.mpGaugeShowMaxValues || 'default';

    toggle9DirButtons(
        '#tpGaugePosition',
        config.tpGaugePosition || 'bottomCenter',
        config.tpGaugePosition || 'bottomCenter',
    );
    tpGaugeOffsetX.value        = config.tpGaugeOffsetX;
    tpGaugeOffsetY.value        = config.tpGaugeOffsetY;
    tpGaugeWidth.value          = config.tpGaugeWidth;
    tpGaugeHeight.value         = config.tpGaugeHeight;
    tpGaugeLabelFontSize.value  = config.tpGaugeLabelFontSize;
    tpGaugeLabelY.value         = config.tpGaugeLabelY;
    tpGaugeValueFontSize.value  = config.tpGaugeValueFontSize;
    tpGaugeValueY.value         = config.tpGaugeValueY;
    tpGaugeShowMaxValues.value  = config.tpGaugeShowMaxValues || 'default';

    // Actor Name
    hideActorName.checked = !!config.hideActorName;
    toggleVisibility('#actorNameBox', !hideActorName.checked);
    toggleButtons(
        '#actorNameVertAlign',
        ['top', 'middle', 'bottom'],
        config.actorNameVertAlign || 'top',
    );

    actorNameOffsetX.value          = config.actorNameOffsetX;
    actorNameOffsetY.value          = config.actorNameOffsetY;
    actorNameWidth.value            = config.actorNameWidth;
    actorNameFontSize.value         = config.actorNameFontSize;
    actorNameBackgroundType.value   = config.actorNameBackgroundType || 'none';
    toggleVisibility('#actorNameBackgroundFileBox', actorNameBackgroundType.value == 'image');

    toggleButtons(
        '#actorNameTextAlign',
        ['left', 'center', 'right'],
        config.actorNameTextAlign || 'left',
    );

    // Actor States
    toggle9DirButtons(
        '#actorStatePosition',
        config.actorStatePosition || 'topRight',
    );
    actorStateOffsetX.value = config.actorStateOffsetX;
    actorStateOffsetY.value = config.actorStateOffsetY;
    actorStateScale.value   = config.actorStateScale;

    // Actor Custom Parameters
    enableCustomParameter.checked = !!config.enableCustomParameter;
    toggleVisibility('#customParameterBox', enableCustomParameter.checked);

    customParameterUseSameDataInput.checked = !!config.customParameterUseSameDataInput;
    toggleVisibility('#customParameterDataBox', !customParameterUseSameDataInput.checked);

    customParameterMode.value                   = config.customParameterMode || 'gauge';
    customParameterLabel.value                  = config.customParameterLabel || '';
    customParameterPreconditionEval.value       = config.customParameterPreconditionEval || '';
    customParameterCurrentValueEval.value       = config.customParameterCurrentValueEval || '';
    customParameterMaxValueEval.value           = config.customParameterMaxValueEval || '';
    showCustomParameterGaugeMaxValues.checked   = !!config.showCustomParameterGaugeMaxValues;
    customParameterNumberEval.value             = config.customParameterNumberEval || '';
    customParameterTextEval.value               = config.customParameterTextEval || '';

    toggleButtons(
        '#customParameterTextAlign',
        ['left', 'center', 'right'],
        config.customParameterTextAlign || 'left',
    );
    customParameterFilledIconIndex.value    = config.customParameterFilledIconIndex;
    customParameterEmptyIconIndex.value     = config.customParameterEmptyIconIndex;
    customParameterIconGap.value            = config.customParameterIconGap;
    customParameterIconScale.value          = config.customParameterIconScale;
    
    customParameterFontSize.value           = config.customParameterFontSize;
    customParameterOffsetX.value            = config.customParameterOffsetX;
    customParameterOffsetY.value            = config.customParameterOffsetY;
    customParameterWidth.value              = config.customParameterWidth;
    customParameterHeight.value             = config.customParameterHeight;

    toggleVisibility('#customParameterLabelBox',                ['gauge', 'x-y', 'number'].includes(customParameterMode.value));
    toggleVisibility('#customParameterXYValuesBox',             ['gauge', 'iconMeter', 'x-y'].includes(customParameterMode.value));
    toggleVisibility('#customParameterShowMaxValueBox',         customParameterMode.value == 'gauge');
    toggleVisibility('#customParameterIconMeterBox',            customParameterMode.value == 'iconMeter');
    toggleVisibility('#customParameterNumberEvalBox',           customParameterMode.value == 'number');
    toggleVisibility('#customParameterTextEvalBox',             customParameterMode.value == 'text');
    toggleVisibility('#customParameterHeightBox',               customParameterMode.value == 'gauge');
    toggleVisibility('#customParameterTextAlignBox',            ['iconMeter', 'text'].includes(customParameterMode.value));
    toggleVisibility('#customParameterWhenNotEmptyTextColorBox', customParameterMode.value != 'iconMeter');
    toggleVisibility('#customParameterWhenEmptyTextColorBox',   ['gauge', 'x-y', 'number'].includes(customParameterMode.value));
    toggleVisibility('#customParameterGaugeBox',                customParameterMode.value == 'gauge');
    toggleVisibility('#customParameterFontSizeBox',             ['x-y', 'number'].includes(customParameterMode.value));

    // Extra Background
    partyStatusExtraBackground.checked = !!config.partyStatusExtraBackground;
    toggleVisibility('#partyStatusExtraBackgroundBox', partyStatusExtraBackground.checked);
    
    extraBackgroundPosition.value   = config.extraBackgroundPosition || 'topLeft';
    extraBackgroundAnchor.value     = config.extraBackgroundAnchor || 'topLeft';
    extraBackgroundX.value          = config.extraBackgroundX;
    extraBackgroundY.value          = config.extraBackgroundY;
    extraBackgroundScale.value      = config.extraBackgroundScale;

    // Party Commands
    toggleButtons(
        '#partyCommandsStyle',
        ['both', 'icon', 'text'],
        config.partyCommandsStyle || 'both',
    );
    toggleButtons(
        '#partyCommandsTextAlign',
        ['left', 'center', 'right'],
        config.partyCommandsTextAlign || 'center',
    );
    partyCommandsBackgroundType.value = config.partyCommandsBackgroundType || 'window';
    toggleVisibility('#partyCommandsBackgroundFileBox', partyCommandsBackgroundType.value == 'image');
    
    partyCommandsItemBackgroundType.value = config.partyCommandsItemBackgroundType || 'default';
    toggleVisibility('#partyCommandsItemBackgroundFileBox', partyCommandsItemBackgroundType.value == 'image');
    
    partyCommandsOpacity.value = config.partyCommandsOpacity;
    partyCommandsPadding.value = config.partyCommandsPadding;
    partyCommandsItemHeight.value = config.partyCommandsItemHeight;
    partyCommandsFontSize.value = config.partyCommandsFontSize;
    partyCommandsDashHorz.value = config.partyCommandsDashHorz;
    partyCommandsDashVert.value = config.partyCommandsDashVert;

    // Actor Commands
    toggleButtons(
        '#actorCommandsStyle',
        ['both', 'icon', 'text'],
        config.actorCommandsStyle || 'both',
    );
    toggleButtons(
        '#actorCommandsTextAlign',
        ['left', 'center', 'right'],
        config.actorCommandsTextAlign || 'center',
    );
    actorCommandsBackgroundType.value = config.actorCommandsBackgroundType || 'window';
    toggleVisibility('#actorCommandsBackgroundFileBox', actorCommandsBackgroundType.value == 'image');
    
    actorCommandsItemBackgroundType.value = config.actorCommandsItemBackgroundType || 'default';
    toggleVisibility('#actorCommandsItemBackgroundFileBox', actorCommandsItemBackgroundType.value == 'image');
    
    actorCommandsOpacity.value = config.actorCommandsOpacity;
    actorCommandsPadding.value = config.actorCommandsPadding;
    actorCommandsItemHeight.value = config.actorCommandsItemHeight;
    actorCommandsFontSize.value = config.actorCommandsFontSize;
    actorCommandsDashHorz.value = config.actorCommandsDashHorz;
    actorCommandsDashVert.value = config.actorCommandsDashVert;

    // Skill & Item List
    skillItemListBackgroundType.value = config.skillItemListBackgroundType || 'window';
    toggleVisibility('#skillItemListBackgroundFileBox', skillItemListBackgroundType.value == 'image');
    
    skillItemListOpacity.value = config.skillItemListOpacity;
    skillItemListPadding.value = config.skillItemListPadding;
    skillItemListItemHeight.value = config.skillItemListItemHeight;
    skillItemListFontSize.value = config.skillItemListFontSize;
    skillItemListDashHorz.value = config.skillItemListDashHorz;
    skillItemListDashVert.value = config.skillItemListDashVert;

    // Enemy Select Window
    enemyWindowBackgroundType.value = config.enemyWindowBackgroundType || 'window';
    toggleVisibility('#enemyWindowBackgroundFileBox', enemyWindowBackgroundType.value == 'image');
    
    enemyWindowOpacity.value = config.enemyWindowOpacity;
    enemyWindowPadding.value = config.enemyWindowPadding;
    enemyWindowItemHeight.value = config.enemyWindowItemHeight;
    enemyWindowFontSize.value = config.enemyWindowFontSize;
    enemyWindowDashHorz.value = config.enemyWindowDashHorz;
    enemyWindowDashVert.value = config.enemyWindowDashVert;

    // Help Window
    helpWindowBackgroundType.value = config.helpWindowBackgroundType || 'window';
    toggleVisibility('#helpWindowBackgroundFileBox', helpWindowBackgroundType.value == 'image');

    // Log Window
    logWindowX.value        = config.logWindowX;
    logWindowY.value        = config.logWindowY;
    logWindowWidth.value    = config.logWindowWidth;

    // SV Actors
    allowSvSetActorHomeOverride.checked     = config.allowSvSetActorHomeOverride !== false;
    allowSvActorStepForwardOverride.checked = config.allowSvActorStepForwardOverride !== false;
    allowSvActorScaleOverride.checked       = config.allowSvActorScaleOverride !== false;
    toggleVisibility('#allowSvSetActorHomeOverrideBox', allowSvSetActorHomeOverride.checked);
    toggleVisibility('#allowSvActorStepForwardOverrideBox', allowSvActorStepForwardOverride.checked);
    toggleVisibility('#allowSvActorScaleOverrideBox', allowSvActorScaleOverride.checked);

    svActorPositionX.value              = config.svActorPositionX;
    svActorPositionY.value              = config.svActorPositionY;
    svActorPositionHorzIncrement.value  = config.svActorPositionHorzIncrement;
    svActorPositionVertIncrement.value  = config.svActorPositionVertIncrement;
    svActorPositionEngageShift.value    = config.svActorPositionEngageShift;
    svActorScale.value                  = config.svActorScale;

    // Support Actors
    useSupportActorsFeature.checked     = !!config.useSupportActorsFeature;
    supportActorConditionMode.value     = config.supportActorConditionMode || 'allExceptLeader';

    toggleVisibility('#supportActorsFeatureBox', useSupportActorsFeature.checked);
    toggleVisibility('#supportActorsConditionByNotetagBox', supportActorConditionMode.value == 'notetag');

    supportActorsWindowWidthFactor.value    = config.supportActorsWindowWidthFactor;
    supportActorsWindowHeightFactor.value   = config.supportActorsWindowHeightFactor;
    supportActorsPortraitScale.value        = config.supportActorsPortraitScale;

    // Misc
    defaultWindowDashSpeed.value = typeof config.defaultWindowDashSpeed === 'number' ? config.defaultWindowDashSpeed : 1.0;
}

function onPartyStatusOrientationChange(orientation) {
    toggleButtons(
        '#partyStatusOrientation',
        ['rows', 'columns'],
        orientation,
    );

    config.partyStatusOrientation = orientation;
    onSave();
}

function onPartyStatusModeChange(mode) {
    toggleButtons(
        '#partyStatusMode',
        ['singleWindow', 'splitted'],
        mode,
    );
    toggleVisibility('#partyStatusSplittedLayoutBox', 'splitted' == mode);
    toggleEnable('#partyStatusDimensionsByOverall',   'splitted' != mode);

    if (mode == 'splitted') {
        toggleButtons(
            '#partyStatusDimensionsBy',
            ['cell', 'overall'],
            'cell',
        );
        config.partyStatusDimensionsMode = 'cell';
    }

    config.partyStatusMode = mode;
    onSave();
}

function onPartyCommandsPositionModeChange(mode) {
    toggleVisibility('#partyCommandsPositionByScreenBox',       mode == 'screen');
    toggleVisibility('#partyCommandsPositionByStatusWindowBox', mode != 'screen');

    config.partyCommandsPositionMode = mode;
    onSave();
}

function onPartyStatusPositionChange(direction) {
    toggle9DirButtons('#partyStatusPosition', direction);

    config.partyStatusPosition = direction;
    onSave();
}

function onPartyStatusDimensionsModeChange(mode) {
    toggleButtons(
        '#partyStatusDimensionsBy',
        ['cell', 'overall'],
        mode,
    );

    config.partyStatusDimensionsMode = mode;
    onSave();
}

function onActorCommandsPositionModeChange(mode) {
    toggleVisibility('#actorCommandsPositionByScreenBox', mode == 'screen');
    toggleVisibility('#actorCommandsPositionByStatusWindowBox', mode != 'screen');

    config.actorCommandsPositionMode = mode;
    onSave();
}

function onSkillItemListPositionModeChange(mode) {
    toggleVisibility('#skillItemListPositionByScreenBox', mode == 'screen');
    toggleVisibility('#skillItemListPositionByStatusWindowBox', mode != 'screen');

    config.skillItemListPositionMode = mode;
    onSave();
}

function onSkillItemListHeightByChange(mode) {
    toggleButtons(
        '#skillItemListHeightBy',
        ['fixed', 'lineNumber'],
        mode,
    );

    toggleVisibility('#skillItemListHeightByFixedBox', mode == 'fixed');
    toggleVisibility('#skillItemListHeightByLineNumberBox', mode == 'lineNumber');

    config.skillItemListHeightMode = mode;
    onSave();
}

function onSkillItemListColumnsChange(n) {
    toggleButtons(
        '#skillItemListColumns',
        ['1', '2', '3'],
        n,
    );

    config.skillItemListColumns = Number(n);
    onSave();
}

function changeWindowBehaviour(configType, mode) {
    toggleButtons('#' + configType, ['stayOpen', 'close'], mode);
    
    config[configType] = mode;
    onSave();
}

function onUseEnemyWindowChange(checked) {
    toggleVisibility('#enemyWindowBox', checked);
    
    config.useEnemyWindow = checked;
    onSave();
}

function onEnemyWindowPositionModeChange(mode) {
    toggleVisibility('#enemyWindowPositionByScreenBox', mode == 'screen');
    toggleVisibility('#enemyWindowPositionByStatusWindowBox', mode != 'screen');

    config.enemyWindowPositionMode = mode;
    onSave();
}

function onEnemyWindowHeightByChange(mode) {
    toggleButtons(
        '#enemyWindowHeightBy',
        ['fixed', 'lineNumber'],
        mode,
    );

    toggleVisibility('#enemyWindowHeightByFixedBox', mode == 'fixed');
    toggleVisibility('#enemyWindowHeightByLineNumberBox', mode == 'lineNumber');

    config.enemyWindowHeightMode = mode;
    onSave();
}

function onEnemyWindowColumnsChange(n) {
    toggleButtons(
        '#enemyWindowColumns',
        ['1', '2', '3'],
        n,
    );

    config.enemyWindowColumns = Number(n);
    onSave();
}

function onPartyStatusBackgroundTypeChange(type) {
    toggleVisibility('#partyStatusBackgroundFileBox', type == 'image');
    
    config.partyStatusBackgroundType = type;
    onSave();
}

function onPartyStatusItemBackgroundTypeChange(type) {
    toggleVisibility('#partyStatusItemBackgroundFileBox', type == 'image');
    
    config.partyStatusItemBackgroundType = type;
    onSave();
}

function onPartyStatusExtraBackgroundChange(checked) {
    toggleVisibility('#partyStatusExtraBackgroundBox', checked);

    config.partyStatusExtraBackground = checked;
    onSave();
}

function onActorPortraitModeChange(mode) {
    toggleButtons(
        '#actorPortraitMode',
        ['none', 'portrait', 'face'],
        mode,
    );

    toggleVisibility('#actorPortraitBox',           mode != 'none');
    toggleVisibility('#actorCustomPortraitInfoBox', mode == 'portrait');
    toggleVisibility('#actorPortraitAnchorBox',     mode == 'portrait');
    toggleVisibility('#actorPortraitAsFaceBox',     mode == 'face');
    toggleVisibility('#actorPortraitAsCustomBox',   mode == 'portrait');

    config.actorPortraitMode = mode;
    onSave();
}

function onKnockoutEffectButtonClick(name) {
    if (name == 'blackWhite')       changeTone('actorPortraitKnockoutColor', [0, 0, 0, 255]);
    if (name == 'blackWhiteDark')   changeTone('actorPortraitKnockoutColor', [-122, -122, -122, 255]);
    if (name == 'black')            changeTone('actorPortraitKnockoutColor', [-255, -255, -255, 0]);
    if (name == 'red')              changeTone('actorPortraitKnockoutColor', [-60, -255, -255, 255]);
    if (name == 'none')             changeTone('actorPortraitKnockoutColor');
}

function changeTone(elementId, array = [ ]) {
    $('#' + elementId +   'Red').val(array[0]);
    $('#' + elementId + 'Green').val(array[1]);
    $('#' + elementId +  'Blue').val(array[2]);
    $('#' + elementId +  'Grey').val(array[3]);

    config[elementId + 'Red']   = array[0];
    config[elementId + 'Green'] = array[1];
    config[elementId + 'Blue']  = array[2];
    config[elementId + 'Grey']  = array[3];
    onSave();
}

function onHideActorNameChange(checked) {
    toggleVisibility('#actorNameBox', !checked);

    config.hideActorName = checked;
    onSave();
}

function onActorNameVertAlign(align) {
    toggleButtons(
        '#actorNameVertAlign',
        ['top', 'middle', 'bottom'],
        align,
    );

    config.actorNameVertAlign = align;
    onSave();
}

function onActorNameBackgroundTypeChange(type) {
    toggleVisibility('#actorNameBackgroundFileBox', type == 'image')
    
    config.actorNameBackgroundType = type;
    onSave();
}

function onEnableCustomParameterChange(checked) {
    toggleVisibility('#customParameterBox', checked);
    
    config.enableCustomParameter = checked;
    onSave();
}

function onCustomParameterUseSameDataInputChange(checked) {
    toggleVisibility('#customParameterDataBox', !checked);
    
    config.customParameterUseSameDataInput = checked;
    onSave();
}

function onCustomParameterModeChange(customParameterMode) {
    toggleVisibility('#customParameterLabelBox',                ['gauge', 'x-y', 'number'].includes(customParameterMode));
    toggleVisibility('#customParameterXYValuesBox',             ['gauge', 'iconMeter', 'x-y'].includes(customParameterMode));
    toggleVisibility('#customParameterShowMaxValueBox',         customParameterMode == 'gauge');
    toggleVisibility('#customParameterIconMeterBox',            customParameterMode == 'iconMeter');
    toggleVisibility('#customParameterNumberEvalBox',           customParameterMode == 'number');
    toggleVisibility('#customParameterTextEvalBox',             customParameterMode == 'text');
    toggleVisibility('#customParameterHeightBox',               customParameterMode == 'gauge');
    toggleVisibility('#customParameterTextAlignBox',            ['iconMeter', 'text'].includes(customParameterMode));
    toggleVisibility('#customParameterWhenNotEmptyTextColorBox', customParameterMode != 'iconMeter');
    toggleVisibility('#customParameterWhenEmptyTextColorBox',   ['gauge', 'x-y', 'number'].includes(customParameterMode));
    toggleVisibility('#customParameterGaugeBox',                customParameterMode == 'gauge');
    toggleVisibility('#customParameterFontSizeBox',             ['x-y', 'number'].includes(customParameterMode));

    config.customParameterMode = customParameterMode;
    onSave();
}

function onPartyCommandsStyleChange(mode) {
    toggleButtons(
        '#partyCommandsStyle',
        ['both', 'icon', 'text'],
        mode,
    );

    config.partyCommandsStyle = mode;
    onSave();
}

function onPartyCommandsBackgroundTypeChange(type) {
    toggleVisibility('#partyCommandsBackgroundFileBox', type == 'image');
    
    changeText('partyCommandsBackgroundType', type);
}

function onPartyCommandsItemBackgroundTypeChange(type) {
    toggleVisibility('#partyCommandsItemBackgroundFileBox', type == 'image');

    changeText('partyCommandsItemBackgroundType', type);
}

function onActorCommandsStyleChange(mode) {
    toggleButtons(
        '#actorCommandsStyle',
        ['both', 'icon', 'text'],
        mode,
    );

    config.actorCommandsStyle = mode;
    onSave();
}

function onActorCommandsBackgroundTypeChange(type) {
    toggleVisibility('#actorCommandsBackgroundFileBox', type == 'image');

    changeText('actorCommandsBackgroundType', type);
}

function onActorCommandsItemBackgroundTypeChange(type) {
    toggleVisibility('#actorCommandsItemBackgroundFileBox', type == 'image');

    changeText('actorCommandsItemBackgroundType', type);
}

function onSkillItemListBackgroundTypeChange(type) {
    toggleVisibility('#skillItemListBackgroundFileBox', type == 'image');

    changeText('skillItemListBackgroundType', type);
}

function onEnemyWindowBackgroundTypeChange(type) {
    toggleVisibility('#enemyWindowBackgroundFileBox', type == 'image');

    changeText('enemyWindowBackgroundType', type);
}

function onHelpWindowBackgroundTypeChange(type) {
    toggleVisibility('#helpWindowBackgroundFileBox', type == 'image');

    changeText('helpWindowBackgroundType', type);
}

function onAllowSvSetActorHomeOverrideChange(checked) {
    config.allowSvSetActorHomeOverride = checked;

    toggleVisibility('#allowSvSetActorHomeOverrideBox', checked);
    onSave();
}

function onAllowSvActorStepForwardOverrideChange(checked) {
    config.allowSvActorStepForwardOverride = checked;

    toggleVisibility('#allowSvActorStepForwardOverrideBox', checked);
    onSave();
}

function onAllowSvActorScaleOverrideChange(checked) {
    config.allowSvActorScaleOverride = checked;

    toggleVisibility('#allowSvActorScaleOverrideBox', checked);
    onSave();
}

function onUseSupportActorsFeatureChange(checked) {
    config.useSupportActorsFeature = checked;

    toggleVisibility('#supportActorsFeatureBox', checked);
    onSave();
}

function onSupportActorConditionModeChange(mode) {
    config.supportActorConditionMode = mode;

    toggleVisibility('#supportActorsConditionByNotetagBox', mode == 'notetag');
    onSave();
}


function onQuickAction(action) {
    const select = actorSelect.value || 'all';

    if (select == 'all' && action == 'kill') {
        return; // not allowed
    }

    window.opener.$gameParty.members()
        .filter(actor => select == 'all' || actor.index() === Number(select))
        .forEach(actor => applyQuickAction(actor, action));
}

function applyQuickAction(actor, action) {
    if (!actor) return;

    switch (action) {
        case 'heal':        actor.revive(); actor.setHp(actor.mhp);             break;
        case 'crisis':      actor.revive(); actor.setHp(1);                     break;
        case 'kill':        actor.setHp(0);                                     break;
        case 'applyStates': for (let i = 2; i < 7; i++) actor.addState(i);      break;
        case 'clearStates': for (let i = 2; i < 7; i++) actor.removeState(i);   break;
    }
}

function onActorSelectChange(value) {
    toggleEnable('#quickActionKill', value != 'all');
}

$(document).ready(() => toggleEnable('#quickActionKill', actorSelect.value != 'all'));


function killLeader() {
    leader() && leader().setHp(0);
}

function reviveLeader() {
    const actor = leader();

    if (actor) {
        actor.revive();
        actor.setHp(999999);
    }
}

function applyStates() {
    for (let i = 2; i < 7; i++) {
        leader() && leader().addState(i);
    }
}

function clearStates() {
    for (let i = 2; i < 7; i++) {
        leader() && leader().removeState(i);
    }
}

function leader() {
    return window.opener.$gameParty.leader();
}

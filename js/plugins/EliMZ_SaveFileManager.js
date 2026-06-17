/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦2.0.0♦ Adds permadeath save mode, save file copy and deletion.
@author Hakuen Studio
@url https://docs.google.com/document/d/1afVqSMcyzZVxym3MJGBl3vILb_26Qt0_MakiLmPn1OM/edit?usp=sharing

@help
↑↑↑ HOW TO USE / HELP FILE ABOVE ↑↑↑

★★★★★ → Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/hakuen-studio-save-file-manager-for-rpg-maker-mz/rate?source=game

♦ TERMS OF USE
https://www.hakuenstudio.com/terms-of-use-5-0-0

♦ DOWNLOAD
https://hakuenstudio.itch.io/hakuen-studio-save-file-manager-for-rpg-maker-mz

♦ SUPPORT
https://hakuenstudio.itch.io/hakuen-studio-save-file-manager-for-rpg-maker-mz/community

♦ FEATURES

● Delete Current Save File
● Delete All Save files
● Delete specific save files.
● Copy save file to another slots
● Permadeath save mode:
- Delete the current save file after Game Over.
- Cannot save into a different save file after the first manual save.
- Cannot copy or delete permadeath save files manually.
- Autosave uses the current save slot instead of the autosave slot.

@param --- Permadeath ---

@param permadeath
@text Enable
@type boolean
@desc Default permadeath state for new games when the New Save Setup window is not used.
@default false
@parent --- Permadeath ---

@param permadeathSwitchId
@text Switch Id
@type switch
@desc This switch reflects the current permadeath state.
@default 0
@parent --- Permadeath ---

@param permadeathIcon
@text Save/Load Icon
@type string
@desc Icon index drawn on permadeath save files. Use 0 to draw no icon.
@default 0
@parent --- Permadeath ---

@param --- New Save Setup Window ---

@param useNewSaveSetupWindow
@text Enabled
@type boolean
@desc If true, a window with Permadeath and Normal Game choices is shown before starting a new game.
@default true
@parent --- New Save Setup Window ---

@param newSaveSetupPermadeathLabel
@text Permadeath Label
@type string
@desc The command name that starts a new game with permadeath enabled.
@default Permadeath
@parent --- New Save Setup Window ---

@param newSaveSetupNormalLabel
@text Normal Game Label
@type string
@desc The command name that starts a new game with permadeath disabled.
@default Normal Game
@parent --- New Save Setup Window ---

@param newSaveSetupWindowPosition
@text Window Position
@type struct<positionSt>
@desc The position of the New Save Setup window.
@default {"alignX":"center","offsetX":"return 0","alignY":"center","offsetY":"return 0"}
@parent --- New Save Setup Window ---

@param newSaveSetupWindowWidth
@text Window Width
@type number
@min 1
@desc The width of the New Save Setup window.
@default 360
@parent --- New Save Setup Window ---

@param --- Confirmation Window ---

@param useConfirmationWindow
@text Enabled
@type boolean
@desc If true, a confirmation window will appear when confirming on a save file.
@default true
@parent --- Confirmation Window ---

@param addDeleteCommand
@text Add Delete Command
@type boolean
@desc If true, the confirmation window will show the Delete command.
@default true
@parent --- Confirmation Window ---

@param addCopyCommand
@text Add Copy Command
@type boolean
@desc If true, the confirmation window will show the Copy command.
@default true
@parent --- Confirmation Window ---

@param confirmationWindowPosition
@text Window Position
@type struct<positionSt>
@desc The position of the confirmation window.
@default {"alignX":"center","offsetX":"return 0","alignY":"center","offsetY":"return 0"}
@parent --- Confirmation Window ---

@param confirmationWindowWidth
@text Window Width
@type number
@min 1
@desc The width of the confirmation window.
@default 240
@parent --- Confirmation Window ---

@param --- Others ---

@param maxSaveFiles
@text Max Save Files
@type number
@min 0
@desc Set the total number of save files. Set 0 to keep the default RPG Maker MZ behavior.
@default 0
@parent --- Others ---

@param hideAutosaveInSaveScene
@text Hide Autosave In Save Scene
@type boolean
@desc If true, the autosave slot will be hidden in the save scene.
@default false
@parent --- Others ---

@param hideAutosaveInLoadScene
@text Hide Autosave In Load Scene
@type boolean
@desc If true, the autosave slot will be hidden in the load scene.
@default false
@parent --- Others ---

@param saveRuleIconTitleSpacing
@text Save/Load Icon Spacing
@type number
@min 0
@desc Spacing between the permadeath icon and the save file title.
@default 4
@parent --- Others ---

@command cmd_deleteSlot
@text Delete Save File
@desc Delete one or more save files. Permadeath save files are protected.

	@arg slots
	@text Slot Ids
	@type string
	@desc Enter the save slot ids to delete. Use 0 for autosave.
	@default

@command cmd_deleteCurrentSlot
@text Delete Current Save File
@desc Delete the currently active save file when it is not protected.

@command cmd_deleteAllSlot
@text Delete All Save Files
@desc Delete all unprotected save files.

@command cmd_copySlot
@text Copy Save File
@desc Copy a save file to one or more target slots. Permadeath save files are protected.

	@arg subjectId
	@text Save File Id
	@type string
	@desc Enter the save file id to copy.
	@default

	@arg targetSlots
	@text Target Slots
	@type string
	@desc Enter the target slot ids.
	@default

	@arg overwrite
	@text Overwrite
	@type boolean
	@desc If true, existing target save files can be overwritten when they are not protected.
	@default true

@command cmd_deleteAllFiles
@text Delete All Save And Extra Files
@desc Delete all unprotected save files and selected extra storage files.

	@arg files
	@text Files
	@type string
	@desc Enter extra file names separated by commas. Do not use spaces.
	@default config, global

*/

/*~struct~positionSt:

    @param alignX
    @text Align X
    @type select
    @option left
    @option center
    @option right
    @desc Select left to only use offset value.
    @default left

    @param offsetX
    @text Position X
    @type string
    @desc The Offset X position.
    @default return 10
    @parent alignX

    @param alignY
    @text Align Y
    @type select
    @option top
    @option center
    @option bottom
    @desc Select top to only use offset value.
    @default top

    @param offsetY
    @text Position Y
    @type string
    @desc The offset Y position.
    @default return 10
    @parent alignY

*/

"use strict"

var Eli = Eli || {}

var Imported = Imported || {}

Imported.Eli_SaveFileManager = true

if(!Imported.Eli_Book && !window.eliErrorTriggered){
	window.eliErrorTriggered = true
	if(confirm(`All EliMZ plugins need the core plugin EliMZ_Book. Click OK to download it and install somewhere above all other EliMZ plugins.`)){
		window.location.href = "https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz"
	}
	SceneManager.exit()
}

Eli.SaveFileManager = {

	pendingNewSaveSetupMode: "",
	isAutoSaving: false,
	copyCommandWaitCount: 0,

	WindowSaveLoadConfirmation: class WindowSaveLoadConfirmation extends Window_Command {

		initialize() {
			this.mode = "save"
			this.hasSavefile = false
			this.canUseMainCommand = true
			this.isProtectedSavefile = false

			super.initialize(this.createWindowRect())
			this.deactivate()
			this.openness = 0
			this.close()
		}

		getParam() {
			return Eli.SaveFileManager.getParam()
		}

		commandCount() {
			let count = 2

			if(this.getParam().addCopyCommand){
				count++
			}

			if(this.getParam().addDeleteCommand){
				count++
			}

			return count
		}

		visibleRows() {
			return Math.max(1, Math.ceil(this.commandCount() / this.maxCols()))
		}

		windowWidth() {
			return this.getParam().confirmationWindowWidth
		}

		windowHeight() {
			return this.fittingHeight(this.visibleRows())
		}

		createWindowRect(){
			const params = this.getParam()
			const width = this.windowWidth()
			const height = this.windowHeight()
			const {alignX, alignY, offsetX, offsetY} = params.confirmationWindowPosition
			const position = {
				alignX, alignY, offsetX: offsetX(), offsetY: offsetY()
			}
			const {x, y} = Eli.Utils.calculatePosition(position, width, height, Graphics.boxWidth, Graphics.boxHeight)

			return new Rectangle(Math.round(x), Math.round(y), width, height)
		}

		refreshPlacement() {
			const rect = this.createWindowRect()
			this.move(rect.x, rect.y, rect.width, rect.height)
		}

		setContext(mode, hasSavefile, isProtectedSavefile = false, canUseMainCommand = true) {
			this.mode = mode
			this.hasSavefile = hasSavefile
			this.isProtectedSavefile = isProtectedSavefile
			this.canUseMainCommand = canUseMainCommand
			this.refreshPlacement()
			this.createContents()
			this.refresh()
		}

		makeCommandList() {
			const mainName = this.mode === "load" ? "Load" : "Save"

			this.addCommand(mainName, "main", this.canUseMainCommand)
			this.addCommand("Cancel", "cancel")

			if(Eli.SaveFileManager.getParam().addCopyCommand){
				this.addCommand("Copy", "copy", this.hasSavefile && !this.isProtectedSavefile)
			}

			if(Eli.SaveFileManager.getParam().addDeleteCommand){
				this.addCommand("Delete", "delete", this.hasSavefile && !this.isProtectedSavefile)
			}
		}

		maxCols() {
			return 2
		}
	},

	WindowNewSaveSetup: class WindowNewSaveSetup extends Window_Command {

		initialize(){
			super.initialize(this.createWindowRect())
			this.deactivate()
			this.openness = 0
			this.close()
		}

		getParam(){
			return Eli.SaveFileManager.getParam()
		}

		visibleRows(){
			return 2
		}

		windowWidth(){
			return this.getParam().newSaveSetupWindowWidth
		}

		windowHeight(){
			return this.fittingHeight(this.visibleRows())
		}

		createWindowRect(){
			const params = this.getParam()
			const width = this.windowWidth()
			const height = this.windowHeight()
			const {alignX, alignY, offsetX, offsetY} = params.newSaveSetupWindowPosition
			const position = {
				alignX, alignY, offsetX: offsetX(), offsetY: offsetY()
			}
			const {x, y} = Eli.Utils.calculatePosition(position, width, height, Graphics.boxWidth, Graphics.boxHeight)

			return new Rectangle(Math.round(x), Math.round(y), width, height)
		}

		makeCommandList(){
			const params = this.getParam()

			this.addCommand(params.newSaveSetupPermadeathLabel, "permadeath")
			this.addCommand(params.newSaveSetupNormalLabel, "normal")
		}

		maxCols(){
			return 1
		}
	},

	Parameters: class Parameters {

		constructor(parameters) {
			this.permadeath = parameters.permadeath === "true"
			this.permadeathSwitchId = Number(parameters.permadeathSwitchId || "0")
			this.permadeathIcon = Number(parameters.permadeathIcon || "0")
			this.useNewSaveSetupWindow = parameters.useNewSaveSetupWindow === "true"
			this.newSaveSetupPermadeathLabel = parameters.newSaveSetupPermadeathLabel || "Permadeath"
			this.newSaveSetupNormalLabel = parameters.newSaveSetupNormalLabel || "Normal Game"
			this.newSaveSetupWindowPosition = this.parsePosition(JSON.parse(parameters.newSaveSetupWindowPosition || "{}"))
			this.newSaveSetupWindowWidth = Number(parameters.newSaveSetupWindowWidth || "360")
			this.useConfirmationWindow = parameters.useConfirmationWindow === "true"
			this.maxSaveFiles = Number(parameters.maxSaveFiles || "0")
			this.hideAutosaveInSaveScene = parameters.hideAutosaveInSaveScene === "true"
			this.hideAutosaveInLoadScene = parameters.hideAutosaveInLoadScene === "true"
			this.addDeleteCommand = parameters.addDeleteCommand === "true"
			this.addCopyCommand = parameters.addCopyCommand === "true"
			this.confirmationWindowPosition = this.parsePosition(JSON.parse(parameters.confirmationWindowPosition || "{}"))
			this.confirmationWindowWidth = Number(parameters.confirmationWindowWidth || "240")
			this.saveRuleIconTitleSpacing = Number(parameters.saveRuleIconTitleSpacing || "4")
		}

		parsePosition(parameters){
			return {
				alignX: parameters.alignX || "center",
				alignY: parameters.alignY || "center",
				offsetX: new Function(parameters.offsetX || "return 0"),
				offsetY: new Function(parameters.offsetY || "return 0"),
			}
		}
	},

	initialize(){
		Eli.VersionManager.register("EliMZ_SaveFileManager", "2.0.0")
		this.initParameters()
		this.initPluginCommands()
	},

	initParameters(){
		const parameters = PluginManager.parameters("EliMZ_SaveFileManager")
		this.parameters = new this.Parameters(parameters)
	},

	initPluginCommands(){
		const commands = [
			"cmd_deleteSlot",
			"cmd_deleteCurrentSlot",
			"cmd_deleteAllSlot",
			"cmd_copySlot",
			"cmd_deleteAllFiles"
		]
		Eli.PluginManager.registerCommands(this, commands, "EliMZ_SaveFileManager")
	},

	getParam(){
		return this.parameters
	},

	getSavedData(){
		return $eliData.SaveFileManager
	},

	setPendingNewSaveSetupMode(saveMode){
		this.pendingNewSaveSetupMode = saveMode
	},

	clearPendingNewSaveSetupMode(){
		this.pendingNewSaveSetupMode = ""
	},

	applyNewSaveSetup(){
		const enabled = this.pendingNewSaveSetupMode ? this.pendingNewSaveSetupMode === "permadeath" : this.getParam().permadeath

		this.setPermadeath(enabled)
		this.clearPendingNewSaveSetupMode()
	},

	isPermadeathEnabled(){
		return this.getSavedData().permadeath
	},

	setPermadeath(enabled){
		this.getSavedData().permadeath = enabled
		this.refreshSwitches()
	},

	createSaveFileManagerInfo(){
		return {
			permadeath: this.isPermadeathEnabled()
		}
	},

	isProtectedSavefile(savefileId){
		return this.savefileHasPermadeath(savefileId)
	},

	savefileHasPermadeath(savefileId){
		const info = DataManager.savefileInfo(savefileId)

		return info?.saveFileManager?.permadeath
	},

	canDeleteSavefile(savefileId){
		return DataManager.savefileExists(savefileId) && !this.isProtectedSavefile(savefileId)
	},

	canCopySourceSavefile(savefileId){
		return DataManager.savefileExists(savefileId) && !this.isProtectedSavefile(savefileId)
	},

	canCopyTargetSavefile(savefileId){
		if(savefileId < 0){
			return false

		}else if(DataManager.savefileExists(savefileId)){
			return !this.isProtectedSavefile(savefileId)

		}else{
			return true
		}
	},

	hasAnyProtectedSavefile(){
		const globalInfo = DataManager._globalInfo || []
		let savefileId = 0

		while(savefileId < globalInfo.length){
			if(this.isProtectedSavefile(savefileId)){
				return true
			}

			savefileId++
		}

		return false
	},

	ruleIconsForSavefile(savefileId){
		const params = this.getParam()
		const icons = []

		if(this.savefileHasPermadeath(savefileId) && params.permadeathIcon > 0){
			icons.push(params.permadeathIcon)
		}

		return icons
	},

	saveRuleTitleOffset(savefileId){
		const iconsWidth = this.ruleIconsForSavefile(savefileId).length * ImageManager.iconWidth

		if(iconsWidth > 0){
			return iconsWidth + this.getParam().saveRuleIconTitleSpacing
		}else{
			return 0
		}
	},

	currentGameSavefileId(){
		return $gameSystem.savefileId()
	},

	canSaveToSavefile(savefileId){
		if(savefileId <= 0){
			return false

		}else if(this.savefileHasPermadeath(savefileId)){
			return this.isPermadeathEnabled() && savefileId === this.currentGameSavefileId()

		}else if(!this.isPermadeathEnabled()){
			return true

		}else{
			const currentSavefileId = this.currentGameSavefileId()

			return !(currentSavefileId > 0 && this.savefileHasPermadeath(currentSavefileId))
		}
	},

	canExecuteAutosave(){
		if(this.isPermadeathEnabled()){
			return this.canSaveToSavefile(this.currentGameSavefileId())
		}else{
			return true
		}
	},

	getAutosaveTargetId(defaultSavefileId){
		const currentSavefileId = this.currentGameSavefileId()

		if(this.isPermadeathEnabled() && currentSavefileId > 0){
			return currentSavefileId
		}else{
			return defaultSavefileId
		}
	},

	deleteCurrentSaveOnGameOver(){
		const savefileId = this.currentGameSavefileId()

		if(savefileId > 0 && DataManager.savefileExists(savefileId)){
			this.deleteSavefilesByIds([savefileId], true)
		}
	},

	refreshSwitches(){
		const permadeathSwitchId = this.getParam().permadeathSwitchId

		if(permadeathSwitchId > 0){
			$gameSwitches.setValue(permadeathSwitchId, this.isPermadeathEnabled())
		}
	},

	cmd_deleteSlot(args){
		const ids = Eli.PluginManager.createIdList(args.slots)
		this.deleteSavefilesByIds(ids)
	},

	cmd_deleteCurrentSlot(){
		this.deleteCurrentSavefile()
	},

	cmd_deleteAllSlot(){
		const ids = Eli.Array.createProgressiveNumbers(0, DataManager.maxSavefiles())
		this.deleteSavefilesByIds(ids)
	},

	deleteSavefilesByIds(savefileIds, force = false){
		let removed = false

		for(const savefileId of savefileIds){
			removed = this.removeSavefileById(savefileId, force) || removed
		}

		if(removed){
			DataManager.removeInvalidGlobalInfo()
			DataManager.saveGlobalInfo()
		}
	},

	removeSavefileById(savefileId, force = false){
		const canForceRemove = force && DataManager.savefileExists(savefileId)

		if(canForceRemove || this.canDeleteSavefile(savefileId)){
			const saveName = DataManager.makeSavename(savefileId)

			DataManager._globalInfo[savefileId] = null
			StorageManager.remove(saveName)

			return true
		}else{
			return false
		}
	},

	cmd_copySlot(args){
		const subjectId = Number(Eli.PluginManager.parseVariables(args.subjectId))
		const targetIds = Eli.PluginManager.createIdList(args.targetSlots)
		const overwrite = args.overwrite === "true"
		const promise = this.copySaveFilesInSequence(subjectId, targetIds, overwrite)
		const interpreter = Eli.PluginManager.getCurrentInterpreter()

		this.startCopyCommandWait(promise)

		if(interpreter){
			interpreter.setWaitMode("saveFileManagerCopy")
		}
	},

	copySaveFilesInSequence(subjectId, targetIds, overwrite){
		let sequence = Promise.resolve()
		let copied = false

		if(!this.canCopySourceSavefile(subjectId)){
			return sequence
		}

		for(const targetId of targetIds){
			const canOverwrite = overwrite || !DataManager.savefileExists(targetId)

			if(canOverwrite && this.canCopyTargetSavefile(targetId)){
				copied = true
				sequence = sequence.then(() => DataManager.copySaveFile(subjectId, targetId, false))
			}
		}

		return sequence.then(() => {
			if(copied){
				DataManager.saveGlobalInfo()
			}
		})
	},

	startCopyCommandWait(promise){
		this.copyCommandWaitCount++

		promise.then(() => {
			this.endCopyCommandWait()
		}).catch(error => {
			this.endCopyCommandWait()
			console.error(error)
		})
	},

	endCopyCommandWait(){
		this.copyCommandWaitCount = Math.max(this.copyCommandWaitCount - 1, 0)
	},

	isCopyCommandRunning(){
		return this.copyCommandWaitCount > 0
	},

	cmd_deleteAllFiles(args){
		const files = (args.files || "").replaceAll(" ", "").split(",")
		this.cmd_deleteAllSlot()

		for(const file of files){
			if(file === "global" && this.hasAnyProtectedSavefile()){
				continue
			}

			if(file){
				StorageManager.remove(file)
			}
		}
	},

	deleteCurrentSavefile(){
		const savefileId = $gameSystem.savefileId()
		this.deleteSavefilesByIds([savefileId])
	},
}

{

const Alias = {}
const Plugin = Eli.SaveFileManager

Plugin.initialize()

/* --------------------------- ELI SAVED CONTENTS --------------------------- */
Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
	Alias.Eli_SavedContents_initialize.call(this)
	this.SaveFileManager = {
		permadeath: Plugin.getParam().permadeath
	}
}

/* ------------------------------ DATA MANAGER ------------------------------ */
if(Plugin.getParam().maxSaveFiles > 0){
	Alias.DataManager_maxSavefiles = DataManager.maxSavefiles
	DataManager.maxSavefiles = function() {
		Alias.DataManager_maxSavefiles.call(this)
		return Plugin.getParam().maxSaveFiles
	}
}

Alias.DataManager_setupNewGame = DataManager.setupNewGame
DataManager.setupNewGame = function(){
	Alias.DataManager_setupNewGame.call(this)
	Plugin.applyNewSaveSetup()
}

Alias.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo
DataManager.makeSavefileInfo = function(){
	const info = Alias.DataManager_makeSavefileInfo.call(this)
	info.saveFileManager = Plugin.createSaveFileManagerInfo()

	return info
}

Alias.DataManager_extractSaveContents = DataManager.extractSaveContents
DataManager.extractSaveContents = function(contents){
	Alias.DataManager_extractSaveContents.call(this, contents)
	Plugin.refreshSwitches()
}

DataManager.copySaveFile = function(subjectId, targetId, saveGlobalInfo = true) {
	const saveName = this.makeSavename(subjectId)

	return StorageManager.loadObject(saveName).then(contents => {
		const copyName = this.makeSavename(targetId)

		if(contents.system){
			contents.system._savefileId = targetId
		}

		return StorageManager.saveObject(copyName, contents).then(() => {
			this._globalInfo[targetId] = JSON.parse(JSON.stringify(this._globalInfo[subjectId]))

			if(saveGlobalInfo){
				this.saveGlobalInfo()
			}

			return 0
		})
	})
}

Alias.DataManager_saveGame = DataManager.saveGame
DataManager.saveGame = function(savefileId) {
	if(Plugin.isAutoSaving){
		savefileId = Plugin.getAutosaveTargetId(savefileId)
		Plugin.isAutoSaving = false
	}
	return Alias.DataManager_saveGame.call(this, savefileId)
}

/* ------------------------------- SCENE TITLE ------------------------------ */
Alias.Scene_Title_create = Scene_Title.prototype.create
Scene_Title.prototype.create = function(){
	Alias.Scene_Title_create.call(this)

	if(Plugin.getParam().useNewSaveSetupWindow){
		this.createNewSaveSetupWindow()
	}
}

Alias.Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame
Scene_Title.prototype.commandNewGame = function(){
	if(Plugin.getParam().useNewSaveSetupWindow){
		this.openNewSaveSetupWindow()
	}else{
		Plugin.clearPendingNewSaveSetupMode()
		Alias.Scene_Title_commandNewGame.call(this)
	}
}

Scene_Title.prototype.createNewSaveSetupWindow = function(){
	this.newSaveSetupWindow = new Plugin.WindowNewSaveSetup()
	this.newSaveSetupWindow.setHandler("ok", this.onNewSaveSetupOk.bind(this))
	this.newSaveSetupWindow.setHandler("cancel", this.onNewSaveSetupCancel.bind(this))
	this.addWindow(this.newSaveSetupWindow)
}

Scene_Title.prototype.openNewSaveSetupWindow = function(){
	this._commandWindow.deactivate()
	this.newSaveSetupWindow.select(0)
	this.newSaveSetupWindow.open()
	this.newSaveSetupWindow.activate()
}

Scene_Title.prototype.onNewSaveSetupOk = function(){
	Plugin.setPendingNewSaveSetupMode(this.newSaveSetupWindow.currentSymbol())
	this.newSaveSetupWindow.close()
	this.newSaveSetupWindow.deactivate()
	Alias.Scene_Title_commandNewGame.call(this)
}

Scene_Title.prototype.onNewSaveSetupCancel = function(){
	Plugin.clearPendingNewSaveSetupMode()
	this.newSaveSetupWindow.close()
	this.newSaveSetupWindow.deactivate()
	this._commandWindow.activate()
}

/* ----------------------------- BATTLE MANAGER ----------------------------- */
Alias.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd
BattleManager.updateBattleEnd = function() {
	if(this.canDeleteSaveOnGameOver()){
		Plugin.deleteCurrentSaveOnGameOver()
	}

	Alias.BattleManager_updateBattleEnd.call(this)
}

BattleManager.canDeleteSaveOnGameOver = function() {
	return !this._escaped && $gameParty.isAllDead() && !this._canLose && Plugin.isPermadeathEnabled()
}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
Alias.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode
Game_Interpreter.prototype.updateWaitMode = function() {
	if(this._waitMode === "saveFileManagerCopy"){
		const waiting = Plugin.isCopyCommandRunning()

		if(!waiting){
			this._waitMode = ""
		}

		return waiting
	}

	return Alias.Game_Interpreter_updateWaitMode.call(this)
}

/* ------------------------------- SCENE BASE ------------------------------- */
Alias.Scene_Base_checkGameover = Scene_Base.prototype.checkGameover
Scene_Base.prototype.checkGameover = function() {
	if($gameParty.isAllDead() && Plugin.isPermadeathEnabled()){
		Plugin.deleteCurrentSaveOnGameOver()
	}

	Alias.Scene_Base_checkGameover.call(this)
}

Alias.Scene_Base_executeAutosave = Scene_Base.prototype.executeAutosave
Scene_Base.prototype.executeAutosave = function() {
	if(Plugin.canExecuteAutosave()){
		Plugin.isAutoSaving = true
		Alias.Scene_Base_executeAutosave.call(this)
	}else{
		Plugin.isAutoSaving = false
	}
}

/* ------------------------------- SCENE FILE ------------------------------- */
if(Plugin.getParam().useConfirmationWindow){

	Alias.Scene_File_initialize = Scene_File.prototype.initialize
	Scene_File.prototype.initialize = function() {
		Alias.Scene_File_initialize.call(this)
		this.copySourceSavefileId = -1
	}

	Alias.Scene_File_create = Scene_File.prototype.create
	Scene_File.prototype.create = function() {
		Alias.Scene_File_create.call(this)
		this.createSaveLoadConfirmationWindow()
	}

	Alias.Scene_File_createListWindow = Scene_File.prototype.createListWindow
	Scene_File.prototype.createListWindow = function() {
		Alias.Scene_File_createListWindow.call(this)
		this._listWindow.setHandler("cancel", this.onSavefileCancel.bind(this))
	}

	Scene_File.prototype.createSaveLoadConfirmationWindow = function() {
		this.saveLoadConfirmationWindow = new Plugin.WindowSaveLoadConfirmation()

		this.saveLoadConfirmationWindow.setHandler("main", this.onActionMain.bind(this))
		this.saveLoadConfirmationWindow.setHandler("copy", this.onActionCopy.bind(this))
		this.saveLoadConfirmationWindow.setHandler("delete", this.onActionDelete.bind(this))
		this.saveLoadConfirmationWindow.setHandler("cancel", this.onActionCancel.bind(this))

		this.addWindow(this.saveLoadConfirmationWindow)
	}

	Scene_File.prototype.openSaveLoadConfirmationWindow = function() {
		const savefileId = this.savefileId()
		const hasSavefile = DataManager.savefileExists(savefileId)
		const isProtectedSavefile = hasSavefile && Plugin.isProtectedSavefile(savefileId)
		const canUseMainCommand = this.canUseMainConfirmationCommand(savefileId)

		this.saveLoadConfirmationWindow.setContext(this.mode(), hasSavefile, isProtectedSavefile, canUseMainCommand)
		this.saveLoadConfirmationWindow.select(0)
		this.saveLoadConfirmationWindow.open()
		this.saveLoadConfirmationWindow.activate()
		this._listWindow.deactivate()
	}

	Scene_File.prototype.canUseMainConfirmationCommand = function(savefileId) {
		return true
	}

	Scene_File.prototype.closeSaveLoadConfirmationWindow = function() {
		if(this.saveLoadConfirmationWindow){
			this.saveLoadConfirmationWindow.close()
			this.saveLoadConfirmationWindow.deactivate()
		}

		this._listWindow.activate()
	}

	Scene_File.prototype.onSavefileOkWithConfirmationWindow = function(){
		if(this.isCopyTargetMode()){
			this.executeCopyTarget()
		}else{
			this.openSaveLoadConfirmationWindow()
		}
	}

	Scene_File.prototype.onSavefileCancel = function() {
		if(this.isCopyTargetMode()){
			this.cancelCopyTargetMode()
		}else{
			this.popScene()
		}
	}

	Scene_File.prototype.onActionCancel = function() {
		this.closeSaveLoadConfirmationWindow()
	}

	Scene_File.prototype.onActionMain = function(){
		this.closeSaveLoadConfirmationWindow()
	}

	Scene_File.prototype.onActionCopy = function() {
		const savefileId = this.savefileId()

		if(Plugin.canCopySourceSavefile(savefileId)){
			this.startCopyTargetMode(savefileId)
		}else{
			SoundManager.playBuzzer()
			this.saveLoadConfirmationWindow.activate()
		}
	}

	Scene_File.prototype.startCopyTargetMode = function(savefileId) {
		if(!Plugin.canCopySourceSavefile(savefileId)){
			SoundManager.playBuzzer()
			this.saveLoadConfirmationWindow.activate()
		}else{
			this.copySourceSavefileId = savefileId
			this.closeSaveLoadConfirmationWindow()
			this._listWindow.setCopyTargetMode(true)
			this._listWindow.refresh()
			this._helpWindow.setText("Select the target save slot.")
			this._listWindow.activate()
		}
	}

	Scene_File.prototype.endCopyTargetMode = function() {
		this.copySourceSavefileId = -1
		this._listWindow.setCopyTargetMode(false)
		this._listWindow.refresh()
		this._helpWindow.setText(this.helpWindowText())
	}

	Scene_File.prototype.cancelCopyTargetMode = function() {
		this.endCopyTargetMode()
		this._listWindow.activate()
	}

	Scene_File.prototype.isCopyTargetMode = function() {
		return this.copySourceSavefileId >= 0
	}

	Scene_File.prototype.executeCopyTarget = function() {
		const sourceId = this.copySourceSavefileId
		const targetId = this.savefileId()

		if(sourceId === targetId || !Plugin.canCopySourceSavefile(sourceId) || !Plugin.canCopyTargetSavefile(targetId)){
			SoundManager.playBuzzer()
			this._listWindow.activate()
		}else{
			this._listWindow.deactivate()

			DataManager.copySaveFile(sourceId, targetId).then(() => {
				this.endCopyTargetMode()
				this._listWindow.selectSavefile(targetId)
				this._listWindow.activate()
			}).catch(() => {
				SoundManager.playBuzzer()
				this.endCopyTargetMode()
				this._listWindow.activate()
			})
		}
	}

	Scene_File.prototype.onActionDelete = function() {
		const savefileId = this.savefileId()

		if(Plugin.canDeleteSavefile(savefileId)){
			this.closeSaveLoadConfirmationWindow()
			Plugin.deleteSavefilesByIds([savefileId])
			this._listWindow.refresh()
			this._listWindow.activate()
		}else{
			SoundManager.playBuzzer()
			this.saveLoadConfirmationWindow.activate()
		}
	}
}

/* ------------------------------- SCENE SAVE ------------------------------- */
Alias.Scene_Save_executeSave = Scene_Save.prototype.executeSave
Scene_Save.prototype.executeSave = function(savefileId) {
	if(Plugin.canSaveToSavefile(savefileId)){
		Alias.Scene_Save_executeSave.call(this, savefileId)
	}else{
		this.onSaveFailure()
	}
}

if(Plugin.getParam().useConfirmationWindow){
	Alias.Scene_Save_onSavefileOk = Scene_Save.prototype.onSavefileOk
	Scene_Save.prototype.onSavefileOk = function() {
		this.onSavefileOkWithConfirmationWindow()
	}

	Scene_Save.prototype.canUseMainConfirmationCommand = function(savefileId) {
		return Plugin.canSaveToSavefile(savefileId) && this.isSavefileEnabled(savefileId)
	}

	Scene_Save.prototype.onActionMain = function() {
		this.closeSaveLoadConfirmationWindow()

		const savefileId = this.savefileId()

		if(Plugin.canSaveToSavefile(savefileId) && this.isSavefileEnabled(savefileId)){
			this.executeSave(savefileId)
		}else{
			this.onSaveFailure()
		}
	}
}

if(Plugin.getParam().hideAutosaveInSaveScene){
	Scene_Save.prototype.needsAutosave = function() {
		return false
	}
}

/* ------------------------------- SCENE LOAD ------------------------------- */
if(Plugin.getParam().useConfirmationWindow){
	Alias.Scene_Load_onSavefileOk = Scene_Load.prototype.onSavefileOk
	Scene_Load.prototype.onSavefileOk = function() {
		this.onSavefileOkWithConfirmationWindow()
	}

	Scene_Load.prototype.canUseMainConfirmationCommand = function(savefileId) {
		return this.isSavefileEnabled(savefileId)
	}

	Scene_Load.prototype.onActionMain = function() {
		this.closeSaveLoadConfirmationWindow()

		const savefileId = this.savefileId()

		if(this.isSavefileEnabled(savefileId)){
			this.executeLoad(savefileId)
		}else{
			this.onLoadFailure()
		}
	}
}

if(Plugin.getParam().hideAutosaveInLoadScene){
	Scene_Load.prototype.needsAutosave = function() {
		return false
	}
}

/* -------------------------- WINDOW SAVE FILE LIST ------------------------- */
Alias.Window_SavefileList_initialize = Window_SavefileList.prototype.initialize
Window_SavefileList.prototype.initialize = function(rect) {
	Alias.Window_SavefileList_initialize.call(this, rect)
	this.copyTargetMode = false
}

Window_SavefileList.prototype.setCopyTargetMode = function(enabled) {
	this.copyTargetMode = enabled
}

Window_SavefileList.prototype.isCopyTargetMode = function() {
	return this.copyTargetMode
}

Alias.Window_SavefileList_isEnabled = Window_SavefileList.prototype.isEnabled
Window_SavefileList.prototype.isEnabled = function(savefileId) {
	if(this.isCopyTargetMode()){
		return Plugin.canCopyTargetSavefile(savefileId)

	}else if(this._mode === "save" && Plugin.getParam().useConfirmationWindow){
		return Alias.Window_SavefileList_isEnabled.call(this, savefileId)

	}else if(this._mode === "save" && !Plugin.canSaveToSavefile(savefileId)){
		return false
	}

	return Alias.Window_SavefileList_isEnabled.call(this, savefileId)
}

Alias.Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle
Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
	const icons = Plugin.ruleIconsForSavefile(savefileId)
	const titleOffset = Plugin.saveRuleTitleOffset(savefileId)

	let iconX = x

	for(const icon of icons){
		this.drawIcon(icon, iconX, y + 2)
		iconX += ImageManager.iconWidth
	}

	Alias.Window_SavefileList_drawTitle.call(this, savefileId, x + titleOffset, y)
}

}
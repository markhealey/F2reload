F2.Apps["com_openf2_examples_javascript_helloworld_reload"] = (function() {

	var App_Class = function (appConfig, appContent, root) {
		this.appConfig = appConfig;
		this.appConfig.context = this.appConfig.context || {};
		this.appContent = appContent;
		this.ui = appConfig.ui;
		this.$root = $(root);
	};

	App_Class.prototype.init = function () {

		this.$root
			.off('click', 'a.reloadApp')
			.on('click', 'a.reloadApp', $.proxy(function() {
				this.reloadByRemove();
			}, this))
			.off('click', 'a.reloadByReplace')
			.on('click', 'a.reloadByReplace', $.proxy(function() {
				this.reloadByReplace();
			}, this))
		;
		
		// bind symbol change event
		F2.Events.on(F2.Constants.Events.CONTAINER_SYMBOL_CHANGE, $.proxy(this._handleSymbolChange, this));

		//attach guid to prove reload
		if (this.appConfig.context.reloaded){
			$('div.f2-app-view',this.$root).append('<p>Reloaded!<br><small>('+F2.guid()+')</small></p>');
			//we're done, null this until next time.
			this.appConfig.context.reloaded = null;
		}
		this.ui.updateHeight();
	};

	App_Class.prototype._handleSymbolChange = function (data) {
		
		var symbolAlert = $("div.symbolAlert", this.$root);
		symbolAlert = (symbolAlert.length)
			? symbolAlert
			: this._renderSymbolAlert();

		$("span:first", symbolAlert).text("The symbol has been changed to " + data.symbol);

		this.ui.updateHeight();
	};

	App_Class.prototype._renderSymbolAlert = function() {

		return $([
				'<div class="alert alert-success symbolAlert">',
					'<button type="button" class="close" data-dismiss="alert">&#215;</button>',
					'<span></span>',
				'</div>'
			].join(''))
			.prependTo($("." + F2.Constants.Css.APP_CONTAINER,this.$root));
	};

	//remove current version, replace inner HTML with new app
	App_Class.prototype.reloadByReplace = function() {
		this.$root = null;
		this.appConfig.root = null;
		this.appConfig.context = $.extend( {}, this.appConfig.context, { newProp:'newValue', reloaded: true } );
		F2.registerApps(this.appConfig);
	};

	return App_Class;
})();
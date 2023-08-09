var MetrixAttribution = {

    setPushToken: function (token) {
        if (MetrixAttributionBridge) {
            MetrixAttributionBridge.setPushToken(token);
        }
    },

    setOnAttributionChangedListener: function (callback) {
        if (MetrixAttributionBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getAttributionCallbackName = callback;
            } else {
                this.getAttributionCallbackName = 'MetrixAttribution.metrix_getAttributionCallback';
                this.getAttributionCallbackFunction = callback;
            }
            MetrixAttributionBridge.setOnAttributionChangedListener(this.getAttributionCallbackName);
        }
    },

    metrix_getAttributionCallback: function (attribution) {
        if (MetrixAttributionBridge && this.getAttributionCallbackFunction) {
            this.getAttributionCallbackFunction(attribution);
        }
    },

    setUserIdListener: function (callback) {
        if (MetrixAttributionBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getUserIdCallbackName = callback;
            } else {
                this.getUserIdCallbackName = 'MetrixAttribution.metrix_getUserIdCallback';
                this.getUserIdCallbackFunction = callback;
            }
            MetrixAttributionBridge.setUserIdListener(this.getUserIdCallbackName);
        }
    },

    metrix_getUserIdCallback: function (userId) {
        if (MetrixAttributionBridge && this.getUserIdCallbackFunction) {
            this.getUserIdCallbackFunction(userId);
        }
    },

    shouldLaunchDeeplink: true,

    setOnDeeplinkResponseListener: function (callback) {
        if (MetrixAttributionBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getDeeplinkResponseCallbackName = callback;
            } else {
                this.getDeeplinkResponseCallbackName = 'MetrixAttribution.metrix_getDeeplinkResponseCallback';
                this.getDeeplinkResponseCallbackFunction = callback;
            }
            MetrixAttributionBridge.setOnDeeplinkResponseListener(this.shouldLaunchDeeplink, this.getDeeplinkResponseCallbackName);
        }
    },

    metrix_getDeeplinkResponseCallback: function (deeplink) {
        if (MetrixAttributionBridge && this.getDeeplinkResponseCallbackFunction) {
            this.getDeeplinkResponseCallbackFunction(deeplink);
        }
    },

    teardown: function () {
        if (MetrixAttributionBridge) {
            MetrixAttributionBridge.teardown();
        }
        this.getDeeplinkResponseCallbackName = undefined;
        this.getDeeplinkResponseCallbackFunction = undefined;

        this.getUserIdCallbackName = undefined;
        this.getUserIdCallbackFunction = undefined;

        this.getAttributionCallbackName = undefined;
        this.getAttributionCallbackFunction = undefined;
    }
};
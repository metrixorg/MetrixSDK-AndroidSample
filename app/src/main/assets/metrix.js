var Metrix = {
    newEvent: function (name, attributes) {
        if (MetrixBridge) {
            if (attributes) {
                MetrixBridge.newEvent(name, JSON.stringify(attributes));
            } else {
                MetrixBridge.newEvent(name);
            }
        }
    },

    newRevenue: function (slug, revenue, currency, orderId) {
        if (MetrixBridge) {
            let cr = null;
            if (currency === 0) {
                cr = "IRR";
            } else if (currency === 1) {
                cr = "USD";
            } else if (currency == 2) {
                cr = "EUR";
            }
            if (cr == null && orderId == null) {
                MetrixBridge.newRevenueSimple(slug, revenue);
            } else if (cr == null && orderId != null) {
                MetrixBridge.newRevenueOrderId(slug, revenue, orderId);
            } else if (orderId == null) {
                MetrixBridge.newRevenueCurrency(slug, revenue, cr);
            } else {
                MetrixBridge.newRevenueFull(slug, revenue, cr, orderId);
            }
        }
    },

    setPushToken: function (token) {
        if (MetrixBridge) {
            MetrixBridge.setPushToken(token);
        }
    },

    setSessionNumberListener: function (callback) {
        if (MetrixBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getSessionNumberCallbackName = callback;
            } else {
                this.getSessionNumberCallbackName = 'Metrix.metrix_getSessionNumberCallback';
                this.getSessionNumberCallbackFunction = callback;
            }
            MetrixBridge.setSessionNumberListener(this.getSessionNumberCallbackName);
        }
    },

    metrix_getSessionNumberCallback: function (sessionNumber) {
        if (MetrixBridge && this.getSessionNumberCallbackFunction) {
            this.getSessionNumberCallbackFunction(sessionNumber);
        }
    },

    setSessionIdListener: function (callback) {
        if (MetrixBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getSessionIdCallbackName = callback;
            } else {
                this.getSessionIdCallbackName = 'Metrix.metrix_getSessionIdCallback';
                this.getSessionIdCallbackFunction = callback;
            }
            MetrixBridge.setSessionIdListener(this.getSessionIdCallbackName);
        }
    },

    metrix_getSessionIdCallback: function (sessionId) {
        if (MetrixBridge && this.getSessionIdCallbackFunction) {
            this.getSessionIdCallbackFunction(sessionId);
        }
    },

    addUserAttributes: function (userAttributes) {
        if (MetrixBridge) {
            MetrixBridge.addUserAttributes(JSON.stringify(userAttributes));
        }
    },

    setOnAttributionChangedListener: function (callback) {
        if (MetrixBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getAttributionCallbackName = callback;
            } else {
                this.getAttributionCallbackName = 'Metrix.metrix_getAttributionCallback';
                this.getAttributionCallbackFunction = callback;
            }
            MetrixBridge.setOnAttributionChangedListener(this.getAttributionCallbackName);
        }
    },

    metrix_getAttributionCallback: function (attribution) {
        if (MetrixBridge && this.getAttributionCallbackFunction) {
            this.getAttributionCallbackFunction(attribution);
        }
    },

    setUserIdListener: function (callback) {
        if (MetrixBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getUserIdCallbackName = callback;
            } else {
                this.getUserIdCallbackName = 'Metrix.metrix_getUserIdCallback';
                this.getUserIdCallbackFunction = callback;
            }
            MetrixBridge.setUserIdListener(this.getUserIdCallbackName);
        }
    },

    metrix_getUserIdCallback: function (userId) {
        if (MetrixBridge && this.getUserIdCallbackFunction) {
            this.getUserIdCallbackFunction(userId);
        }
    },

    shouldLaunchDeeplink: true,

    setOnDeeplinkResponseListener: function (callback) {
        if (MetrixBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getDeeplinkResponseCallbackName = callback;
            } else {
                this.getDeeplinkResponseCallbackName = 'Metrix.metrix_getDeeplinkResponseCallback';
                this.getDeeplinkResponseCallbackFunction = callback;
            }
            MetrixBridge.setOnDeeplinkResponseListener(this.shouldLaunchDeeplink, this.getDeeplinkResponseCallbackName);
        }
    },

    metrix_getDeeplinkResponseCallback: function (deeplink) {
        if (MetrixBridge && this.getDeeplinkResponseCallbackFunction) {
            this.getDeeplinkResponseCallbackFunction(deeplink);
        }
    },

    teardown: function () {
        if (MetrixBridge) {
            MetrixBridge.teardown();
        }
        this.getDeeplinkResponseCallbackName = undefined;
        this.getDeeplinkResponseCallbackFunction = undefined;

        this.getUserIdCallbackName = undefined;
        this.getUserIdCallbackFunction = undefined;

        this.getAttributionCallbackName = undefined;
        this.getAttributionCallbackFunction = undefined;

        this.getSessionIdCallbackName = undefined;
        this.getSessionIdCallbackFunction = undefined;

        this.getSessionNumberCallbackName = undefined;
        this.getSessionNumberCallbackFunction = undefined;
    }
};
var MetrixAnalytics = {
    newEvent: function (name, attributes) {
        if (MetrixAnalyticsBridge) {
            if (attributes) {
                MetrixAnalyticsBridge.newEvent(name, JSON.stringify(attributes));
            } else {
                MetrixAnalyticsBridge.newEvent(name);
            }
        }
    },

    newRevenue: function (slug, revenue, currency) {
        if (MetrixAnalyticsBridge) {
            if (currency == null) {
                MetrixAnalyticsBridge.newRevenueSimple(slug, revenue);
            } else {
                MetrixAnalyticsBridge.newRevenueCurrency(slug, revenue, currency);
            }
        }
    },

    setPushToken: function (token) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setPushToken(token);
        }
    },

    setSessionNumberListener: function (callback) {
        if (MetrixAnalyticsBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getSessionNumberCallbackName = callback;
            } else {
                this.getSessionNumberCallbackName = 'MetrixAnalytics.metrix_getSessionNumberCallback';
                this.getSessionNumberCallbackFunction = callback;
            }
            MetrixAnalyticsBridge.setSessionNumberListener(this.getSessionNumberCallbackName);
        }
    },

    metrix_getSessionNumberCallback: function (sessionNumber) {
        if (MetrixAnalyticsBridge && this.getSessionNumberCallbackFunction) {
            this.getSessionNumberCallbackFunction(sessionNumber);
        }
    },

    setSessionIdListener: function (callback) {
        if (MetrixAnalyticsBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getSessionIdCallbackName = callback;
            } else {
                this.getSessionIdCallbackName = 'MetrixAnalytics.metrix_getSessionIdCallback';
                this.getSessionIdCallbackFunction = callback;
            }
            MetrixAnalyticsBridge.setSessionIdListener(this.getSessionIdCallbackName);
        }
    },

    metrix_getSessionIdCallback: function (sessionId) {
        if (MetrixAnalyticsBridge && this.getSessionIdCallbackFunction) {
            this.getSessionIdCallbackFunction(sessionId);
        }
    },

    setUserIdListener: function (callback) {
        if (MetrixAnalyticsBridge) {
            if (typeof callback === 'string' || callback instanceof String) {
                this.getUserIdCallbackName = callback;
            } else {
                this.getUserIdCallbackName = 'MetrixAnalytics.metrix_getUserIdCallback';
                this.getUserIdCallbackFunction = callback;
            }
            MetrixAnalyticsBridge.setUserIdListener(this.getUserIdCallbackName);
        }
    },

    metrix_getUserIdCallback: function (userId) {
        if (MetrixAnalyticsBridge && this.getUserIdCallbackFunction) {
            this.getUserIdCallbackFunction(userId);
        }
    },

    setUserAttributes: function (userAttributes) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserAttributes(JSON.stringify(userAttributes));
        }
    },

    setUserCustomId = function (id) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserCustomId(id);
        }
    }

    deleteUserCustomId = function () {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.deleteUserCustomId();
        }
    }

    setUserFirstName = function (firstName) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserFirstName(firstName);
        }
    }

    setUserLastName = function (lastName) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserLastName(lastName);
        }
    }

    setUserPhoneNumber = function (phoneNumber) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserPhoneNumber(phoneNumber);
        }
    }

    setUserHashedPhoneNumber = function (hashedPhoneNumber) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserHashedPhoneNumber(hashedPhoneNumber);
        }
    }

    setUserEmail = function (email) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserEmail(email);
        }
    }

    setUserHashedEmail = function (hashedEmail) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserHashedEmail(hashedEmail);
        }
    }

    setUserCountry = function (country) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserCountry(country);
        }
    }

    setUserCity = function (city) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserCity(city);
        }
    }

    setUserRegion = function (region) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserRegion(region);
        }
    }

    setUserLocality = function (locality) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserLocality(locality);
        }
    }

    setUserGender = function (gender) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserGender(gender);
        }
    }

    setUserBirthday = function (birthday) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserBirthday(birthday);
        }
    }

    setUserFcmToken = function (fcmToken) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.setUserFcmToken(fcmToken);
        }
    }

    userChannelEnabled = function (channel) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.userChannelEnabled(channel);
        }
    }

    userChannelDisabled = function (channel) {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.userChannelDisabled(channel);
        }
    }

    teardown: function () {
        if (MetrixAnalyticsBridge) {
            MetrixAnalyticsBridge.teardown();
        }

        this.getUserIdCallbackName = undefined;
        this.getUserIdCallbackFunction = undefined;

        this.getSessionIdCallbackName = undefined;
        this.getSessionIdCallbackFunction = undefined;

        this.getSessionNumberCallbackName = undefined;
        this.getSessionNumberCallbackFunction = undefined;
    }
};
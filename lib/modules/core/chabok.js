"use strict";

/**
 * This exposes the native AdpPushClient module as a JS module.
 */
import {NativeModules, platform} from "react-native";

const AdpNativeModule = NativeModules.AdpPushClient;

export const playServicesAvailability = AdpNativeModule.playServicesAvailability;

export class AdpPushClient {

  initializeApp = (appName, options, cbk) => {
    AdpNativeModule.initializeApp(appName, options, response => {
      cbk(response);
    });
  };


  init = async (appId, apiKey, username, password) => {
    if (!appId || !apiKey || !username || !password) {
      return Promise.reject(new Error('all parameters are required!'))
    }

    return await AdpNativeModule.init(appId, apiKey, username, password)
  }

  register = (userId, channels) => {
    AdpNativeModule.register(userId, channels);
  };

  unregister = () => {
    AdpNativeModule.unregister()
  }

  /*
  For publish in public channel set userId to "*".
      * payload.channel: String
      * payload.content: String
      * payload.data: Object
      * payload.userId: String(optional)
   */
  publish = async (payload) => {
    if (!payload) {
      return Promise.reject(new Error('payload is required'))
    }
    if (!payload.channel || typeof payload.channel !== 'string') {
      return Promise.reject(new Error('channel must be a string value!'))
    }
    if (!payload.content || typeof payload.content !== 'string') {
      return Promise.reject(new Error('content must be a string value!'))
    }
    if (payload.userId && typeof payload.userId !== 'string') {
      return Promise.reject(new Error('userId must be a string value!'))
    }
    if (payload.data && typeof payload.data !== 'object') {
      return Promise.reject(new Error('data must be an object!'))
    }

    return await AdpNativeModule.publish(payload);
  };

  addTag = async (tag) => {
    return await AdpNativeModule.addTag(tag);
  };

  addTags = async (...tag) => {
    return await AdpNativeModule.addTags(tag);
  };

  removeTag = async (tag) => {
    return await AdpNativeModule.removeTag(tag);
  };

  removeTags = async (...tag) => {
    return await AdpNativeModule.removeTags(tag);
  };

  getInstallationId = async () => {
    return await AdpNativeModule.getInstallationId()
  }

  getUserId = async () => {
    return await AdpNativeModule.getUserId()
  }

  resetBadge = () => {
    AdpNativeModule.resetBadge()
  }

  setDevelopment = devMode => {
    AdpNativeModule.setDevelopment(devMode)
  }


  track = (trackName, data) => {
    AdpNativeModule.track(trackName, data)
  }

  subscribe = async (channel) => {
    return await AdpNativeModule.subscribe(channel);
  };

  unSubscribe = async (channel) => {
    return await AdpNativeModule.unSubscribe(channel);
  };
}

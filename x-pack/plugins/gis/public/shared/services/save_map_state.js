/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { getStore, gisStateSync } from '../../store/store';
import _ from 'lodash';


export const getMapInitState = overallState => {
  let { mapState } = overallState;
  if (mapState && !_.isEmpty(mapState)) {
    mapState = JSON.parse(mapState, (key, val) => {
      if (isNaN(val) || typeof val === 'boolean') {
        return val;
      } else {
        return +val;
      }
    });
    return mapState;
  }
};

const getCurrentMapState = (() => {
  const customReplacer = (key, value) => {
    if (typeof value === 'number') {
      return value.toString();
    }
    return value;
  };
  // Filter out unneeded fields
  const filteredState = map => {
    const layerList = map.layerList.map(layer => {
      /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
      const { data, ...layerDetails } = layer;
      return layerDetails;
    });
    const filteredMap = { ...map, layerList };
    return filteredMap;
  };
  return async () => {
    const store = await getStore();
    const { map } = store.getState();
    const filteredMap = filteredState(map);
    const stringMap = JSON.stringify(filteredMap, customReplacer);
    return (stringMap);
  };
})();

export const saveMapSettings = async gisWorkspace => {
  const currentMapState = await getCurrentMapState();
  return ({ newTitle }) => {
    const savedObjectId = gisStateSync.get('workspaceId');
    const newState = { mapState: currentMapState, title: newTitle };
    if (savedObjectId) {
      return gisWorkspace.update(savedObjectId, newState);
    } else {
      return gisWorkspace.save(newState)
        .then(({ id }) => {
          if (id) gisStateSync.set('workspaceId', id);
          return { id };
        });
    }
  };
};
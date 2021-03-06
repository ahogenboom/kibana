/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export default function ({ getService, getPageObjects }) {
  const dashboardPanelActions = getService('dashboardPanelActions');
  const testSubjects = getService('testSubjects');
  const PageObjects = getPageObjects(['dashboard']);

  describe('Panel Actions', () => {
    before(async () => {
      await PageObjects.dashboard.loadSavedDashboard('few panels');
    });

    it('Sample action appears in context menu in view mode', async () => {
      await dashboardPanelActions.openContextMenu();
      await testSubjects.existOrFail(
        'dashboardPanelAction-samplePanelAction'
      );
    });

    it('Clicking sample action shows a flyout', async () => {
      await testSubjects.click('dashboardPanelAction-samplePanelAction');
      await testSubjects.existOrFail('samplePanelActionFlyout');
    });

    it('flyout shows the correct contents', async () => {
      await testSubjects.existOrFail('samplePanelActionTitle');
      await testSubjects.existOrFail('samplePanelActionBody');
    });
  });
}

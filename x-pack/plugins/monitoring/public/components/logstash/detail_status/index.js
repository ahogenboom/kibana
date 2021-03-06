/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { SummaryStatus } from '../../summary_status';
import { formatMetric } from '../../../lib/format_number';
import { injectI18n } from '@kbn/i18n/react';

function DetailStatusUi({ stats, intl }) {
  const {
    http_address: httpAddress,
    events,
    reloads,
    pipeline,
    queue_type: queueType,
    version,
    uptime
  } = stats;

  const firstMetrics = [
    {
      value: httpAddress,
      dataTestSubj: 'httpAddress'
    },
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.eventsReceivedLabel', defaultMessage: 'Events Received'
      }),
      value: formatMetric(events.in, '0.[0]a'),
      dataTestSubj: 'eventsIn'
    },
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.eventsEmittedLabel', defaultMessage: 'Events Emitted'
      }),
      value: formatMetric(events.out, '0.[0]a'),
      dataTestSubj: 'eventsOut'
    },
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.configReloadsLabel', defaultMessage: 'Config Reloads'
      }),
      value: reloads.successes,
      dataTestSubj: 'numReloads'
    },
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.pipelineWorkersLabel', defaultMessage: 'Pipeline Workers'
      }),
      value: pipeline.workers,
      dataTestSubj: 'pipelineWorkers'
    },
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.batchSizeLabel', defaultMessage: 'Batch Size'
      }),
      value: pipeline.batch_size,
      dataTestSubj: 'pipelineBatchSize'
    }
  ];

  const lastMetrics = [
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.versionLabel', defaultMessage: 'Version'
      }),
      value: version,
      dataTestSubj: 'version'
    },
    {
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.uptimeLabel', defaultMessage: 'Uptime'
      }),
      value: formatMetric(uptime, 'time_since'),
      dataTestSubj: 'uptime'
    }
  ];

  // make queueType conditional
  const metrics = [...firstMetrics];
  if (queueType) {
    metrics.push({
      label: intl.formatMessage({
        id: 'xpack.monitoring.logstash.detailStatus.queueTypeLabel', defaultMessage: 'Queue Type'
      }),
      value: queueType,
      dataTestSubj: 'queueType'
    });
  }
  metrics.push(...lastMetrics);

  return (
    <SummaryStatus
      metrics={metrics}
      data-test-subj="logstashDetailStatus"
    />
  );
}

export const DetailStatus = injectI18n(DetailStatusUi);

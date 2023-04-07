ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS normal_regn boolean;
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS delayed_within_thirty boolean;
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS delayed_within_oneyear boolean;
ALTER TABLE eg_death_dtls ADD COLUMN IF NOT EXISTS delayed_after_oneyear boolean;

ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS normal_regn boolean;
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS delayed_within_thirty boolean;
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS delayed_within_oneyear boolean;
ALTER TABLE eg_death_dtls_log ADD COLUMN IF NOT EXISTS delayed_after_oneyear boolean;

ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS normal_regn boolean;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS delayed_within_thirty boolean;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS delayed_within_oneyear boolean;
ALTER TABLE eg_death_dtls_registry ADD COLUMN IF NOT EXISTS delayed_after_oneyear boolean;

ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS normal_regn boolean;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS delayed_within_thirty boolean;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS delayed_within_oneyear boolean;
ALTER TABLE eg_death_dtls_registry_log ADD COLUMN IF NOT EXISTS delayed_after_oneyear boolean;
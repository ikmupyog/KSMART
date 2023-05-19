ALTER TABLE eg_death_dtls add column IF NOT EXISTS hasPayment boolean;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS isPaymentSuccess boolean;
ALTER TABLE eg_death_dtls add column IF NOT EXISTS amount DECIMAL;

ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS hasPayment boolean;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS isPaymentSuccess boolean;
ALTER TABLE eg_death_dtls_log add column IF NOT EXISTS amount DECIMAL;

ALTER TABLE eg_tl_owner_pde
ADD COLUMN IF NOT EXISTS ownernamelocal character varying(300),
ADD COLUMN IF NOT EXISTS careof character varying(10),
ADD COLUMN IF NOT EXISTS careofname character varying(200),
ADD COLUMN IF NOT EXISTS designation character varying(150),
ADD COLUMN IF NOT EXISTS housename character varying(200),
ADD COLUMN IF NOT EXISTS street character varying(150),
ADD COLUMN IF NOT EXISTS locality character varying(150),
ADD COLUMN IF NOT EXISTS postoffice character varying(150),
ADD COLUMN IF NOT EXISTS pincode character varying(10);
import { integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

const owned = {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
};

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), email: text('email').notNull(), firstName: text('first_name'), lastName: text('last_name'),
  emailVerifiedAt: integer('email_verified_at', { mode: 'timestamp' }), twoFactorEnabled: integer('two_factor_enabled', { mode: 'boolean' }).notNull().default(false),
  role: text('role', { enum: ['user','admin'] }).notNull().default('user'), createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, t => [uniqueIndex('idx_users_email').on(t.email)]);

export const subscriptions = sqliteTable('subscriptions', {
  ...owned, status: text('status', { enum: ['trial','active','payment_failed','cancelled','expired'] }).notNull(),
  providerCustomerId: text('provider_customer_id'), providerSubscriptionId: text('provider_subscription_id'), trialEndsAt: integer('trial_ends_at', { mode: 'timestamp' }), currentPeriodEndsAt: integer('current_period_ends_at', { mode: 'timestamp' }),
});

export const vehicles = sqliteTable('vehicles', {
  ...owned, name: text('name').notNull(), manufacturer: text('manufacturer').notNull(), model: text('model').notNull(), modelYear: integer('model_year').notNull(),
  registrationNumber: text('registration_number').notNull(), vin: text('vin'), fuelType: text('fuel_type').notNull(), transmission: text('transmission'), currentOdometer: real('current_odometer').notNull(), distanceUnit: text('distance_unit').notNull().default('km'), fuelUnit: text('fuel_unit').notNull().default('litres'), currency: text('currency').notNull().default('ZAR'), photoKey: text('photo_key'),
});

export const trips = sqliteTable('trips', { ...owned, vehicleId: text('vehicle_id').notNull(), date: text('date').notNull(), startOdometer: real('start_odometer').notNull(), endOdometer: real('end_odometer').notNull(), distance: real('distance').notNull(), purpose: text('purpose'), notes: text('notes') });
export const fuelEntries = sqliteTable('fuel_entries', { ...owned, vehicleId: text('vehicle_id').notNull(), date: text('date').notNull(), odometer: real('odometer').notNull(), quantity: real('quantity').notNull(), unitPrice: real('unit_price').notNull(), totalCost: real('total_cost').notNull(), station: text('station'), fullTank: integer('full_tank',{mode:'boolean'}).notNull().default(true), notes: text('notes'), receiptKey: text('receipt_key') });
export const services = sqliteTable('services', { ...owned, vehicleId: text('vehicle_id').notNull(), date: text('date').notNull(), odometer: real('odometer').notNull(), type: text('type').notNull(), workshop: text('workshop'), cost: real('cost').notNull().default(0), nextDate: text('next_date'), nextMileage: real('next_mileage'), notes: text('notes'), invoiceKey: text('invoice_key') });
export const repairs = sqliteTable('repairs', { ...owned, vehicleId: text('vehicle_id').notNull(), date: text('date').notNull(), odometer: real('odometer').notNull(), category: text('category').notNull(), description: text('description').notNull(), workshop: text('workshop'), partsCost: real('parts_cost').notNull().default(0), labourCost: real('labour_cost').notNull().default(0), totalCost: real('total_cost').notNull().default(0), warrantyExpiry: text('warranty_expiry'), notes: text('notes') });
export const expenses = sqliteTable('expenses', { ...owned, vehicleId: text('vehicle_id').notNull(), date: text('date').notNull(), category: text('category').notNull(), amount: real('amount').notNull(), description: text('description') });
export const reminders = sqliteTable('reminders', { ...owned, vehicleId: text('vehicle_id').notNull(), type: text('type').notNull(), title: text('title').notNull(), dueDate: text('due_date'), dueMileage: real('due_mileage'), completedAt: integer('completed_at',{mode:'timestamp'}) });
export const documents = sqliteTable('documents', { ...owned, vehicleId: text('vehicle_id').notNull(), category: text('category').notNull(), filename: text('filename').notNull(), objectKey: text('object_key').notNull(), contentType: text('content_type').notNull(), size: integer('size').notNull() });
export const auditLogs = sqliteTable('audit_logs', { id: text('id').primaryKey(), userId: text('user_id'), action: text('action').notNull(), entityType: text('entity_type'), entityId: text('entity_id'), createdAt: integer('created_at',{mode:'timestamp'}).notNull() });


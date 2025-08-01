export const newProductSample = {
  name: "product",
  description: "description",
  price: 1000,
  msrp: 2000,
  stock: 3,
  categories: ["sports"],
  sku: "test-sku",
};

export const completeProductSample = {
  name: "product",
  description: "description",
  price: 1000,
  msrp: 2000,
  stock: 3,
  id: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
  sku: "test-sku",
};

export const cartItemSample = {
  ...completeProductSample,
  quantity: 3,
  userUUID: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
  cartUUID: "3dd210bf-59df-438f-b50c-2b1dcd08d8b5",
};

export const cartSample = {
  userUUID: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
  cartUUID: "3dd210bf-59df-438f-b50c-2b1dcd08d8b5",
};

export const fullCartSample = {
  ...cartSample,
  items: [cartItemSample],
};

export const orderSample = {
  cartUUID: "36669190-9a99-4092-a894-320839a56b0e",
  checkoutSession: {
    adaptive_pricing: {
      enabled: false,
    },
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: 1499,
    amount_total: 1499,
    automatic_tax: {
      enabled: false,
      liability: null,
      status: null,
    },
    billing_address_collection: null,
    cancel_url: "localhost:3000/cancel",
    client_reference_id: null,
    client_secret: null,
    consent: null,
    consent_collection: null,
    created: 1737492074,
    currency: "usd",
    currency_conversion: null,
    customer: null,
    customer_creation: "if_required",
    customer_details: {
      address: {
        city: null,
        country: "US",
        line1: null,
        line2: null,
        postal_code: "12345",
        state: null,
      },
      email: "test@tester.com",
      name: "Test Tester",
      phone: null,
      tax_exempt: "none",
      tax_ids: [],
    },
    customer_email: null,
    custom_fields: [],
    custom_text: {
      after_submit: null,
      shipping_address: null,
      submit: null,
      terms_of_service_acceptance: null,
    },
    expires_at: 1737578473,
    id: "cs_test_a1UvOXrBMPnfRdrC3L92ITNXDHNSeCZF41biHwTqlFT5zCtnMjmf9p09Ie",
    invoice: null,
    invoice_creation: {
      enabled: false,
      invoice_data: {
        account_tax_ids: null,
        custom_fields: null,
        description: null,
        footer: null,
        issuer: null,
        metadata: {},
        rendering_options: null,
      },
    },
    livemode: false,
    locale: null,
    metadata: {
      cartUUID: "36669190-9a99-4092-a894-320839a56b0e",
      userUUID: "64c8f4c8-2041-70ce-779a-b5c9cc42e55f",
    },
    mode: "payment",
    object: "checkout.session",
    payment_intent: "pi_3QjoGJGPpIbHpsEr1coGWZIC",
    payment_link: null,
    payment_method_collection: "if_required",
    payment_method_configuration_details: {
      id: "pmc_1QfQUOGPpIbHpsErM3iibsbN",
      parent: null,
    },
    payment_method_options: {
      card: {
        request_three_d_secure: "automatic",
      },
    },
    payment_method_types: ["card", "klarna", "link", "cashapp", "amazon_pay"],
    payment_status: "paid",
    phone_number_collection: {
      enabled: false,
    },
    recovered_from: null,
    saved_payment_method_options: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: "complete",
    submit_type: null,
    subscription: null,
    success_url: "localhost:3000/success",
    total_details: {
      amount_discount: 0,
      amount_shipping: 0,
      amount_tax: 0,
    },
    ui_mode: "hosted",
    url: null,
  },
  formattedTotal: "$14.99",
  items: [
    {
      categories: ["Outdoor", "Kitchen"],
      description:
        "Insulated water bottle with a 750ml capacity and leak-proof design.",
      id: "83d8fe05-b204-46ea-86bd-f0ef703809bb",
      msrp: 1999,
      name: "Stainless Steel Water Bottle",
      price: 1499,
      quantity: 1,
      sku: "WB-003",
      stock: 200,
      userUUID: "64c8f4c8-2041-70ce-779a-b5c9cc42e55f",
    },
  ],
  quantity: 1,
  total: 1604,
  userUUID: "64c8f4c8-2041-70ce-779a-b5c9cc42e55f",
};

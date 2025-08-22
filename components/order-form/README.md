# Order Form Components

This directory contains a modular order form system that can be used for different currency types (Iraqi Dinar, Zimbabwe Dollar, etc.).

## Structure

```
components/order-form/
├── OrderForm.js              # Main form component
├── Stepper.js                # Step indicator component
├── OrderDetails.js           # Step 1: Order details form
├── IDVerification.js         # Step 2: ID verification form
├── PaymentInfo.js            # Step 3: Payment information form
├── OrderSummary.js           # Order summary sidebar
├── SuccessModal.js           # Success modal
├── utils.js                  # Utility functions
├── ui/                       # Reusable UI components
│   ├── InputField.js
│   ├── SelectField.js
│   ├── Button.js
│   ├── Alert.js
│   ├── FileUpload.js
│   ├── Checkbox.js
│   ├── BankDetails.js
│   └── SummaryRow.js
└── index.js                  # Export all components
```

## Usage

### Basic Usage

```jsx
import OrderForm from '../../components/order-form/OrderForm';
import { IRAQI_DINAR_CONFIG } from '../../config/currencyConfigs';

export default function BuyDinar() {
  return (
    <MainLayout>
      <OrderForm
        currencyOptions={IRAQI_DINAR_CONFIG.currencyOptions}
        bankDetails={IRAQI_DINAR_CONFIG.bankDetails}
        shippingFee={IRAQI_DINAR_CONFIG.shippingFee}
        bonusConfig={IRAQI_DINAR_CONFIG.bonusConfig}
        pageTitle={IRAQI_DINAR_CONFIG.pageTitle}
      />
    </MainLayout>
  );
}
```

### Configuration

Currency configurations are stored in `config/currencyConfigs.js`:

```javascript
export const IRAQI_DINAR_CONFIG = {
  currencyOptions: [
    { label: "25,000 IQD - $186 AUD", value: 186 },
    // ... more options
  ],
  bankDetails: {
    accountName: "Oz Trading Group Pty Ltd",
    // ... bank details
  },
  bonusConfig: {
    minAmount: 1_000_000,
    bonusAmount: 20_000_000,
    bonusLabel: "20,000,000 Zimbabwe Dollars",
    bonusReason: "Orders of 1,000,000 IQD or more",
    bonusType: "ZWL",
  },
  shippingFee: 49.99,
  pageTitle: "Buy Iraqi Dinar",
};
```

## Props

### OrderForm Props

- `currencyOptions`: Array of currency options with label and value
- `bankDetails`: Object containing bank transfer details
- `shippingFee`: Number for shipping fee
- `bonusConfig`: Object for bonus configuration (optional)
- `pageTitle`: String for page title

### Bonus Configuration

The `bonusConfig` object can be used to set up special offers:

```javascript
{
  minAmount: 1_000_000,        // Minimum amount to qualify
  bonusAmount: 20_000_000,     // Bonus amount
  bonusLabel: "20,000,000 ZWL", // Display label
  bonusReason: "Orders of 1,000,000 IQD or more", // Reason text
  bonusType: "ZWL"             // Bonus type
}
```

## Features

- **Modular Design**: Easy to add new currency types
- **Reusable Components**: UI components can be used elsewhere
- **Configurable**: All currency-specific data is externalized
- **Validation**: Built-in form validation
- **File Upload**: Support for ID and receipt uploads
- **Responsive**: Mobile-friendly design
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Adding New Currency Types

1. Create a new configuration in `config/currencyConfigs.js`
2. Create a new page that uses the `OrderForm` component
3. Pass the appropriate configuration props

## Customization

### Styling
All components use Tailwind CSS classes. You can customize the appearance by modifying the className props.

### Validation
Validation logic is in `utils.js`. You can modify the validation functions to match your requirements.

### API Integration
The form submission logic is in `OrderForm.js`. Modify the `handleSubmit` function to integrate with your backend API.

# ElevenLabs Global Widget Usage Guide

The ElevenLabs ConvAI widget is now available globally across your entire site! Here's how to use it.

## 🎯 **What's Available**

- ✅ **Global Widget**: Appears on every page automatically
- ✅ **Dynamic Context**: Pages can pass user-specific information
- ✅ **Page Awareness**: Widget knows which page the user is on
- ✅ **User Context**: Can access user email and current order ID

## 🚀 **How It Works**

The widget automatically appears in the bottom-right corner of every page. Pages can optionally provide additional context to make the AI more helpful.

## 📝 **Usage Examples**

### **1. Basic Usage (No Additional Setup)**

The widget works out of the box on any page. Just visit any page and you'll see the chat bubble in the bottom-right corner.

### **2. User Dashboard (With User Context)**

```jsx
// In app/user/dashboard/page.js
import { useElevenLabsUser } from "../../../components/useElevenLabsUser";

export default function Dashboard() {
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // Set user context for the widget
  useElevenLabsUser("user@example.com", currentOrder?.id);
  
  // ... rest of your component
}
```

### **3. Order Details Page**

```jsx
// In app/orders/[id]/page.js
import { useElevenLabsUser } from "../../../components/useElevenLabsUser";

export default function OrderDetails({ params }) {
  const orderId = params.id;
  
  // Set context for this specific order
  useElevenLabsUser("customer@example.com", orderId);
  
  // ... rest of your component
}
```

### **4. Product Pages (With Page Context)**

```jsx
// In app/buydinar/page.js
import { useElevenLabsPage } from "../../components/useElevenLabsUser";

export default function BuyDinar() {
  // Set page-specific context
  useElevenLabsPage({
    product_type: "Iraqi Dinar",
    page_type: "product_page",
    currency: "IQD"
  });
  
  // ... rest of your component
}
```

### **5. Contact Page**

```jsx
// In app/contact/page.js
import { useElevenLabsPage } from "../../components/useElevenLabsUser";

export default function Contact() {
  // Set page context for contact page
  useElevenLabsPage({
    page_type: "contact_page",
    support_available: true
  });
  
  // ... rest of your component
}
```

## 🔧 **Available Hooks**

### **useElevenLabsUser(userEmail, orderId, clearOnUnmount)**

Sets user-specific context for the widget.

- `userEmail`: User's email address
- `orderId`: Current order ID (optional)
- `clearOnUnmount`: Whether to clear context when component unmounts (default: true)

### **useElevenLabsPage(pageContext)**

Sets page-specific context for the widget.

- `pageContext`: Object with page-specific variables

## 🎯 **What the AI Agent Can Do**

With the global widget, your AI agent can:

1. **Answer General Questions**: About your services, products, policies
2. **Help with Orders**: Look up order status using the `getOrder` tool
3. **Page-Specific Help**: Provide context-aware assistance based on the current page
4. **User-Specific Support**: Access user email and order information when available

## 🔍 **Testing the Global Widget**

1. **Visit any page** on your site (e.g., `/`, `/buydinar`, `/contact`)
2. **Look for the chat bubble** in the bottom-right corner
3. **Click the bubble** to start a conversation
4. **Try different questions**:
   - "What services do you offer?"
   - "Can you help me with my order?"
   - "What's the status of ORDER-12345?"

## 🎨 **Customization**

### **Widget Position**

To change the widget position, edit `components/GlobalElevenLabsWidget.js`:

```jsx
window.ConvAIWidget.init({
  agentId: agentId,
  position: "bottom-left", // Options: bottom-right, bottom-left, top-right, top-left
  // ...
});
```

### **Global Variables**

To add global variables, edit `components/ElevenLabsContext.js`:

```jsx
const [widgetVariables, setWidgetVariables] = useState({
  site_name: "Dinar Exchange",
  current_page: "/",
  // Add your global variables here
  company_info: "Leading currency exchange service",
  support_hours: "24/7"
});
```

## 🚀 **Production Deployment**

The global widget is ready for production! Just ensure:

1. ✅ **HTTPS is enabled** (required for microphone access)
2. ✅ **Environment variables are set** in production
3. ✅ **ElevenLabs agent is configured** with the webhook tool

## 🎉 **That's It!**

Your ElevenLabs ConvAI widget is now available globally across your entire site. Users can get AI-powered support on any page, with context-aware assistance based on their current location and user information.

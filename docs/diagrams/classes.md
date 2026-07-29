# Diagramme de classes (version corrigée)

![Diagramme de classes](images/classes.png)

> Version finale validée. Le schéma Mermaid ci-dessous est conservé comme source éditable.

# Diagramme de Classes - ShopAI

Ce diagramme présente l'architecture orientée objet du système, incluant les entités principales de la base de données et les services métier.

```mermaid
classDiagram
    %% Entités Métier (Modèles)
    class User {
        -int id
        -String email
        -String passwordHash
        -String firstName
        -String lastName
        -DateTime createdAt
        -DateTime lastLogin
        +login() boolean
        +updateProfile() void
        +changePassword() boolean
    }
    
    class Role {
        -int id
        -String name
        -String description
        +getPermissions() List~String~
    }
    
    class Product {
        -int id
        -String name
        -String reference
        -String description
        -float price
        -int stockQuantity
        -String imageUrl
        -boolean isActive
        +updateStock(int quantity) boolean
        +calculateDiscountPrice(float percentage) float
        +isAvailable() boolean
    }
    
    class Category {
        -int id
        -String name
        -String description
        +getSubcategories() List~Category~
    }
    
    class Tag {
        -int id
        -String name
    }
    
    class Cart {
        -int id
        -DateTime createdAt
        -DateTime updatedAt
        +addItem(Product p, int quantity) void
        +removeItem(Product p) void
        +updateQuantity(Product p, int quantity) void
        +clear() void
        +getTotal() float
    }
    
    class CartItem {
        -int id
        -int quantity
        -DateTime addedAt
        +getSubtotal() float
    }
    
    class Order {
        -int id
        -String orderNumber
        -float totalAmount
        -OrderStatus status
        -DateTime orderDate
        -String trackingNumber
        +updateStatus(OrderStatus newStatus) void
        +generateInvoice() File
    }
    
    class OrderItem {
        -int id
        -int quantity
        -float unitPrice
        +getSubtotal() float
    }
    
    class Address {
        -int id
        -String line1
        -String line2
        -String city
        -String postalCode
        -String country
        -AddressType type
        +formatAddress() String
    }
    
    class Payment {
        -int id
        -PaymentMethod method
        -float amount
        -PaymentStatus status
        -String transactionId
        -DateTime paymentDate
        +processPayment() boolean
        +refund() boolean
    }
    
    class Review {
        -int id
        -int rating
        -String comment
        -boolean isVerified
        -DateTime publishedAt
        +moderate() void
    }
    
    class ActivityLog {
        -int id
        -String actionType
        -String ipAddress
        -String details
        -DateTime timestamp
    }

    %% Services
    class AuthService {
        -UserRepository userRepository
        -TokenService tokenService
        +register(UserDTO data) User
        +authenticate(String email, String pwd) String
        +validateToken(String token) boolean
    }
    
    class ProductService {
        -ProductRepository productRepo
        +createProduct(ProductDTO data) Product
        +updateProduct(int id, ProductDTO data) Product
        +deleteProduct(int id) void
        +searchProducts(String query, FilterDTO filters) List~Product~
    }
    
    class OrderService {
        -OrderRepository orderRepo
        -CartService cartService
        -PaymentService paymentService
        +createOrderFromCart(int userId, Address shipping) Order
        +cancelOrder(int orderId) boolean
        +getUserOrders(int userId) List~Order~
    }
    
    class AIRecommendationService {
        -LLMClient llmClient
        -ProductRepository productRepo
        +getPersonalizedRecommendations(int userId, int productId) List~Product~
        +analyzeReviewSentiment(String reviewText) SentimentScore
        +detectAnomalousActivity(int userId) boolean
    }

    %% Relations d'Association et Composition
    User "1" -- "*" Role : has
    User "1" -- "*" Address : owns
    User "1" -- "1" Cart : has
    User "1" -- "*" Order : places
    User "1" -- "*" Review : writes
    User "1" -- "*" ActivityLog : generates
    
    Cart "1" *-- "*" CartItem : contains
    CartItem "*" -- "1" Product : references
    
    Order "1" *-- "*" OrderItem : contains
    OrderItem "*" -- "1" Product : references
    Order "1" -- "1" Payment : requires
    Order "*" -- "1" Address : shipping
    Order "*" -- "1" Address : billing
    
    Category "1" -- "*" Product : categorizes
    Category "1" -- "*" Category : parent/child
    Product "*" -- "*" Tag : tagged with
    Product "1" -- "*" Review : receives
    
    %% Relations de Dépendance (Services utilisant les modèles)
    AuthService ..> User : manages
    ProductService ..> Product : manages
    OrderService ..> Order : manages
    OrderService ..> Cart : uses
    AIRecommendationService ..> Product : recommends
```

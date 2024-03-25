# Take Home Coding Challenge

Please organize, design, test, and deploy your code (locally on your machine is fine) as if it were going into production. Then send us a link to the hosted repository (e.g. GitHub, Bitbucket...).

## Installation instructions:
Export your OpenAI API key:
```
export OPENAI_API_KEY=yourkey
```
To run the backend do:
```
cd backend/
make setup
make run
```
To run the frontend do:
```
cd frontend/
make setup
make run
```

The backend is running on http://localhost:5001 and the frontend on http://localhost:3000.

## Challenge Description

_The askLio Team has identified the need to create and organize new requests for procurement. If users want to buy a product or service they need to create a formal request to the procurement department. That will afterwards process this request_

### 1. Intake

The initial step in submitting a procurement request is the intake process. This phase is crucial as it gathers all necessary details for the procurement department to proceed. Below is a table of the required information:

| Field Name                                  | Description                                                     | Example                           |
| ------------------------------------------- | --------------------------------------------------------------- | --------------------------------- |
| Requestor Name                              | Full name of the person submitting the request.                 | John Doe                          |
| Title/Short Description                     | Brief name or description of the product/service requested.     | Adobe Creative Cloud Subscription |
| Vendor Name                                 | Name of the company or individual providing the items/services. | Adobe Systems                     |
| Umsatzsteuer-Identifikationsnummer (VAT ID) | VAT identification number of the vendor.                        | DE123456789                       |
| Commodity Group                             | The category or group the requested items/services belong to.   | Software Licences                 |
| Order Lines                                 | List of positions from the offer, detailed as follows:          |                                   |
|                                             | - Position Description: Description of the item/service.        | Adobe Photoshop Licence           |
|                                             | - Unit Price: Price per unit/item/service.                      | 200                               |
|                                             | - Amount: The quantity or number of units being ordered.        | 5                                 |
|                                             | - Unit: The unit of measure or quantity (e.g., licences).       | Licences                          |
|                                             | - Total Price: Total price for this line (Unit Price x amount). | 1000                              |
| Total Cost                                  | Estimated total cost of the request.                            | 3000                              |
| Department                                  | The Department of the Requestor                                 | HR                                |

In the first step build the functionality to create and submit new requests.

Feedback from user interviews has highlighted that requestors often have a vendor's offer at hand. To streamline the process, your task is to introduce an automatic extraction feature, allowing users to upload a document, which then autofills the request.

_Vendor Offer_

```
Vendor Name: Global Tech Solutions
Umsatzsteuer-Identifikationsnummer (VAT ID): DE987654321
Offer Date: March 23, 2024

Offered to: Creative Marketing Department

Items Offered:
1. Product: Adobe Photoshop License
   Unit Price: €150
   Quantity: 10
   Total: €1500

2. Product: Adobe Illustrator License
   Unit Price: €120
   Quantity: 5
   Total: €600

Total Offer Cost: €2100

Terms and Conditions:
Payment due within 30 days of invoice. Prices include applicable taxes.
```

_Extracted Information_

```
- Vendor Name: Global Tech Solutions
- Umsatzsteuer-Identifikationsnummer (VAT ID): DE987654321
- Requestor Department: Creative Marketing Department
- Order Lines:
  - Item 1:
    - Product: Adobe Photoshop License
    - Unit Price: €150
    - Quantity: 10
    - Total: €1500
  - Item 2:
    - Product: Adobe Illustrator License
    - Unit Price: €120
    - Quantity: 5
    - Total: €600
- Total Cost: €2100
```

Additionally, choosing the correct commodity group has been a challenge for users due to its complexity. A procurement manager of the customer says to you: "I don't want that the users have to select the commodity group, they always pick the wrong one, isn't there a better solution?"

**Key Points:**

-   Ensure every request is saved for future reference.
-   Aim to simplify the request submission process for users.
-   Ensure that only valid requests can be submitted.

### 2. Request Overview

With the capability to submit requests, the procurement department requires a system to view and manage these submissions. It's critical to track and update the status of each request (Open, In Progress, closed) to maintain transparency within the department.

**Key Points:**

-   Implement a system to retain every status update accurately.

## Requirements

-   Build a program with a web-based front-end to fulfil the above requirements of the customer
-   Choose the tech stack of your choice
-   It should be a usable product
-   Deployment on your local machine is fine

## Some Final Remarks

-   We actively encourage our employees to use ChatGPT and GitHub Copilot 😉
-   Also feel free to use libraries like (LangChain, etc.) that allow you to build faster.
-   We will provide you an OpenAI API key
-   There are many ways to convince us, but most important is that the key parts are working. Evaluation will also be subject to your background (e.g. if you are no front-end developer, a misplaced button is totally fine, as long as the product is usable)

## Additional Information

#### Commodity Groups

1. **General Services**

    - Accommodation Rentals
    - Membership Fees
    - Workplace Safety
    - Consulting
    - Financial Services
    - Fleet Management
    - Recruitment Services
    - Professional Development
    - Miscellaneous Services
    - Insurance

2. **Facility Management**

    - Electrical Engineering
    - Facility Management Services
    - Security
    - Renovations
    - Office Equipment
    - Energy Management
    - Maintenance
    - Cafeteria and Kitchenettes
    - Cleaning

3. **Publishing Production**

    - Audio and Visual Production
    - Books/Videos/CDs
    - Printing Costs
    - Software Development for Publishing
    - Material Costs
    - Shipping for Production
    - Digital Product Development
    - Pre-production
    - Post-production Costs

4. **Information Technology**

    - Hardware
    - IT Services
    - Software

5. **Logistics**

    - Courier, Express, and Postal Services
    - Warehousing and Material Handling
    - Transportation Logistics
    - Delivery Services

6. **Marketing & Advertising**

    - Advertising
    - Outdoor Advertising
    - Marketing Agencies
    - Direct Mail
    - Customer Communication
    - Online Marketing
    - Events
    - Promotional Materials

7. **Production**
    - Warehouse and Operational Equipment
    - Production Machinery
    - Spare Parts
    - Internal Transportation
    - Production Materials
    - Consumables
    - Maintenance and Repairs
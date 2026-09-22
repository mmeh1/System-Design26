# Specification: [Health and Wellness Waiver Resource]

App description: The app will help users explore the different health and wellness services by providing the services catagories and allowing them to get a detailed view of each. The app will involve home care provider website and incorporating the waiver services to help market and gain more clients. 

## Style and Theme

The app will have soft colors, so that it is appealing to both client and caregiver views. It will have clean lines, with simple color such as white, grey, light blue, and yellow.

Overall mood:
Warm and supportive

Use the *style-guide.html* for details on styling -- fonts, colors, and layout.

## User Scenarios

### Story 1 (most important)

New clients and caregivers will be using the app. Users who are in need of extra help with taking care of their loved ones or themself. Targeted for those who want to take care of their loved one without worrying about money, or getting a caretaker for their loved one without worrying about paying out of pocket. The users will see the different services that are available and see which one they could be eligble for and the next step going forward. The perspective client will contact the provider through the app to gain more insight on next steps, where the provider will assist them. The end goal would be the provider gaining an client out of this process.

---

## Requirements

The app will provide detailed description of the different services, who is eligble, and the next steps for users to take.

### Functional Requirements

R1. The app must include these pages:
	 - Home (`#/`)
	 - Collection (`#/items`)
	 - Item detail (`#/items/:id`)
	 - About (`#/about`)
R2. The navigation bar must let people move to Home, Items, and About.
R3. The app must load data from `items-template.csv` (a simple text table file).
R4. The collection page must show one card per row in the data file.
R5. Each card must include name, short description, and image (if available).
R6. Each card must include a way to open that item's detail page.
R7. The detail page must show full information for one selected item.

### Key Data

Use this as the basic item shape from the current starter data file.

- Item
	- id
	- name
	- description
	- category
	- image_url
	- location

## Success Criteria

Describe what success looks like in simple, observable terms.

1. A new person can open the app and reach the collection page in one click from Home.
2. A new person can open one item detail page from the collection without help.
3. If the data cannot load, the app shows a clear message instead of a blank page.



### Starter defaults

The template starts with Bootstrap default styling (light background, blue primary, simple cards). You only need to describe the changes you want.

## Assumptions

- This is a beginner project for learning how to describe app behavior before generating code. It is a prototype, not a finished product.
- The app stays simple and uses one text table data file as its data source.
- The data may use placeholder images or no images at all. Use picsum.photos for any needed placeholder images.
- Styling remains based on Bootstrap classes already used in the starter project.
- The first version focuses on clarity and working basics, not advanced features.

## Notes for Students (How to Use This Template)

- Keep each section short and plain.
- Write for a classmate who is not technical.
- Focus on user actions and visible results.
- Start with Story 1 and only add extras if you have time.

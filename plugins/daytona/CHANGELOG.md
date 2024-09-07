# @adityasinghal26/backstage-plugin-daytona

## 0.2.5

### Patch Changes

- Update Overview card for Workspace info and layout, including dedicated `Open` button

## 0.2.4

### Patch Changes

- Fix Menu page for create workspaces URL from `/new` to `/create` endpoint

## 0.2.3

### Patch Changes

- Create `StateIndicator` for state icon and description instead of in-built Status objects
- Update tables with scroll capability and removing the pagination for both Overview card and Menu page

## 0.2.2

### Patch Changes

- Update Overview Content for UX
  - Minimalise Overview Content table with workspace name and status along with team name
  - Style card same as About card
- Update loading state for both Overview Card and Menu Page
  - Add Linear Progress bar during page load or sync workspaces button
  - Add `Searching workspaces` during the loading state

## 0.2.1

### Patch Changes

- Improve UI/UX for Daytona menu page and overview card
  - Remove linear progress bar with alert pop-up while syncing workspaces
  - Remove wrapping for State icon and description
  - Add `Create Workspace` button on Overview card to open workspace for entity repository URL
  - Fix top/bottom spacing for the header in Overview Card
  - Get repository URL to create workspaces automatically based on entity location metadata
  - Enable daytona annotation to override the automated repository URL

## 0.2.0

### Minor Changes

- Update Daytona menu page and overview card for UI layout
  - Fix create workspace button for appropriate repository URL in Overview card
  - Create refresh button to update the workspace details
  - Create `DaytonaIcon` logo for all the icon requirements

## 0.1.1

### Patch Changes

- Update plugin documentation for below features:
  - list of features provided
  - package installation and setup in Backstage app
  - backstage app and Daytona ingress CORS configuration
  - setup authentication with Keycloak

## 0.1.0

### Minor Changes

- - Creates a new Daytona Backstage Plugin
  - Creates a ApiRef `daytonaApiRef` can be used for interacting with DaytonaApi with the required methods for Workspace hooks
  - Provides hooks to interact with Daytona Workspaces, Team and User APIs
  - Provides `WorkspaceComponent` page which can be used to view all the Daytona Workspaces (across teams) for the authenticated user
  - Provides `WorkspaceOverviewComponent` card to list all the Daytona Workspaces specific to a particular entity (across teams) for the authenticated user

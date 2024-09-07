import { Entity } from "@backstage/catalog-model";

/**
 * Annotation required for the Daytona Workspaces
 *  @public
 */
export const DAYTONA_WORKSPACE_ANNOTATION = 'daytona.io/repo-url';

/**
 * Get the project name from the entity annotations
 * @param entity - Entity object
 * @returns the value of the project slug in the entity defintion annotations
 */
export const getRepoUrlFromAnnotations = (entity: Entity) => 
    entity?.metadata.annotations?.[DAYTONA_WORKSPACE_ANNOTATION];
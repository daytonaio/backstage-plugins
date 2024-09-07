import { Entity } from "@backstage/catalog-model";
import { useApi } from "@backstage/core-plugin-api";
import { scmIntegrationsApiRef } from '@backstage/integration-react';
import {
    getEntitySourceLocation,
  } from '@backstage/plugin-catalog-react';
  
// @ts-ignore
import parseGitUrl from 'git-url-parse';
import { getRepoUrlFromAnnotations } from "../utils";

export const useRepoUrlFromEntity = (entity: Entity) => {
  const scmApi = useApi(scmIntegrationsApiRef);

  // Override default entity repo URL by updating
  // repository URL in entity metadata annotations
  let repoUrl = getRepoUrlFromAnnotations(entity);
  if(repoUrl !== undefined) {
    return repoUrl;
  }
  
  const repoData = getEntitySourceLocation(entity, scmApi);
  if(repoData === undefined) {
    // Return validation error since no URL found in entity annotations
    return 'No valid repository found in entity metadata.';
  }

  const { protocol, host, full_name } = parseGitUrl(repoData!.locationTargetUrl);
  repoUrl = `${protocol}://${host}/${full_name}`;
  return repoUrl;
}
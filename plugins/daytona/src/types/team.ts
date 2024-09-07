export type Team = {
    
    /**
     * Team has active subscription
     */
    hasActiveSubscription: boolean;

    /** 
     * Team ID
     */
    id: string;

    /**
     * Team Name
     */
    name: string;

    /**
     * Private members
     */
    privateMembers: string;
}

export enum ColorTheme {
    dark    = "dark",
    light   = "light",
    system  = "system",
}

export enum DefaultIDE {
    browser         = "browser",
    vscode          = "vscode",
    jetbrainsIu     = "jetbrains-iu",
    jetbrainsPs     = "jetbrains-ps",
    jetbrainsWs     = "jetbrains-ws",
    jetbrainsPy     = "jetbrains-py",
    jetbrainsRm     = "jetbrains-rm",
    jetbrainsCl     = "jetbrains-cl",
    jetbrainsGo     = "jetbrains-go",
    jetbrainsRd     = "jetbrains-rd",
}

export type UserPreferences = {

    colorTheme: ColorTheme;

    defaultIde: DefaultIDE;

    dotfilesRepositoryUrl: string;
}

export type User = {

    avatarUrl: string;

    disabled: boolean;

    id: string;

    markedForDeletion: string;

    preferences: UserPreferences;

    primaryEmail: string;

    publicSSHKey: string;

    username: string;

}
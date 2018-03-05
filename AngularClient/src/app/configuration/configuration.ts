import { Injectable } from '@angular/core';

export interface Configuration {
    clientId: string,
    authSvcUrl: string;
    endpointSvcUrl: string;
    version: string;
}

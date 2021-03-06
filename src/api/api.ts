import { FilterValues, FavoriteValues } from './../navigation/pages/Network/Network';
import axios from 'axios';
import httpClient from './httpClient';
import * as queries from './queries';
import {FormProps} from '../components/UserInformationForm';

export async function signIn(email: string, password: string) {
  const user = {
    email,
    password,
  };

  return httpClient.post('/auth/sign_in', user, {withToken: false});
}

export async function signUp(email: string, password: string, password_confirmation: string, role: string) {
  const user = {
    email,
    password,
    password_confirmation,
    role
  };

  return httpClient.post('/auth', user, {withToken: false});
}

export async function signPhoto(name: string) {
  return httpClient.post('s3/signed_url', {name});
}

export async function uploadPhoto(url: string, blob: Blob) {
  return axios.put(url, blob);
}

export function validateToken() {
  return httpClient.get('auth/validate_token');
}

export function getSchools() {
  return httpClient.post('/graphql', queries.getSchoolsQuery());
}

export function getTeams() {
  return httpClient.post('/graphql', queries.getTeamsQuery());
}

export function getFacilities() {
  return httpClient.post('/graphql', queries.getFacilitiesQuery());
}

export function getCurrentProfile(id: string) {
  return httpClient.post('/graphql', queries.getCurrentProfileQuery(id));
}

export function updateProfile(form: FormProps) {
  return httpClient.post('/graphql', queries.updateProfileQuery(form));
}

export function getBattingSummary(id: string) {
  return httpClient.post('/graphql', queries.getBattingSummaryQuery(id));
}

export function getAllProfiles(input: FilterValues) {
  return httpClient.post('/graphql', queries.getAllProfilesQuery(input));
}

export function updateFavoriteProfile(form: FavoriteValues) {
  return httpClient.post('/graphql', queries.updateFavoriteProfileQuery(form));
}
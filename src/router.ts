// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/aboutus`
  | `/admin`
  | `/admin/cms`
  | `/articles/:id`
  | `/client/myKost`
  | `/kost/:kostId`
  | `/kost/:kostId/kamar/:kamarId`
  | `/listings`
  | `/login`
  | `/pemilik`
  | `/pemilik/kostManager`
  | `/pemilik/kostManager/:id`
  | `/pemilik/kostManager/:id/kamar`
  | `/pemilik/kostManager/:id/kamar/:id`
  | `/pemilik/payout`
  | `/profile`
  | `/register`

export type Params = {
  '/articles/:id': { id: string }
  '/kost/:kostId': { kostId: string }
  '/kost/:kostId/kamar/:kamarId': { kostId: string; kamarId: string }
  '/pemilik/kostManager/:id': { id: string }
  '/pemilik/kostManager/:id/kamar': { id: string }
  '/pemilik/kostManager/:id/kamar/:id': { id: string; id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()

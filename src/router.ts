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
  | `/client/myKost/:id`
  | `/kost/:kostId`
  | `/kost/:kostId/kamar/:kamarId`
  | `/listings`
  | `/login`
  | `/pemilik/kostManager`
  | `/pemilik/kostManager/:kostId`
  | `/pemilik/kostManager/:kostId/kamar/:kamarId`
  | `/pemilik/payout`
  | `/profile`
  | `/register`
  | `/terms`

export type Params = {
  '/articles/:id': { id: string }
  '/client/myKost/:id': { id: string }
  '/kost/:kostId': { kostId: string }
  '/kost/:kostId/kamar/:kamarId': { kostId: string; kamarId: string }
  '/pemilik/kostManager/:kostId': { kostId: string }
  '/pemilik/kostManager/:kostId/kamar/:kamarId': { kostId: string; kamarId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()

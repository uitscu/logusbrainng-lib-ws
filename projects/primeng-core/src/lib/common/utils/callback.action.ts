import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';

/**
 * Droits d'accès (sécurité)
 */
export interface OnGrantInit extends OnInit, AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy {
  isGranted(claims: string[]): boolean;
}

/**
 * Initialisation du formulaire
 */
export interface OnFormGroupInit {
  initForm(): FormGroup;
}

/**
 * Chargement de données initial
 */
export interface OnLoadDataInit {
  loadData(): void;
}

/**
 * Soumission du formulaire (générique)
 */
export interface OnSubmitAction {
  onSubmit(): void;
}

/**
 * Impression
 */
export interface OnPrintAction {
  onPrint(): void;
}

/**
 * Réinitialisation de l'état du composant
 */
export interface OnResetState {
  onReset(): void;
}

/**
 * Nettoyage de champs/état
 */
export interface OnClear {
  onClear(e: any): void;
}

/**
 * Rafraîchissement des données
 */
export interface OnRefresh {
  onRefresh(): void;
}

/**
 * Fermeture d'un composant/dialogue
 */
export interface OnClosable {
  onClose(): void;
}

/**
 * Retour arrière (navigation)
 */
export interface OnGoback extends OnGrantInit {
  onGoback(): void;
}

/**
 * Gestion du changement d'état (ex: statut activé/désactivé)
 */
export interface OnHandleChangedStatusAction {
  handleChangedStatus(e: any): void;
}

/**
 * Sélection/déselection de ligne dans une table
 */
export interface OnRowSelectedAction {
  onRowSelected(event: any): void;
  onRowUnselected(event: any, dt: Table): void;
}

/**
 * Action sur bouton de dialogue (ex: valider/annuler)
 */
export interface OnDialogButtonAction extends OnGrantInit {
  onDone(): void;
  onDismiss(): void;
}

/**
 * Dialogue avec formulaire
 */
export interface OnDialogModalAction extends OnDialogButtonAction, OnFormGroupInit {
  onAdd(): void;
  onEdit(entity: any): void;
  onReset(): void;
}

/**
 * Chargement de données dans des dropdowns
 */
export interface OnLoadDataDropdown extends OnGrantInit, AfterViewInit {
  onLoadData($event: any): void;
}

/**
 * Action d'export/import
 */
export interface OnExportDataAction extends OnHandleChangedStatusAction {
  onImportTo(): void;
  onExportTo(): void;
}

/**
 * Formulaire simple (soumission, init, reset, etc.)
 */
export interface OnFormSubmitAction extends
  OnGrantInit,
  OnSubmitAction,
  OnFormGroupInit,
  OnResetState,
  OnClear { }

/**
 * Formulaire avec édition (ex: mode CRUD)
 */
export interface OnEditionFormSubmitAction extends
  OnGrantInit,
  OnFormGroupInit,
  OnPrintAction,
  OnResetState,
  OnClear { }

/**
 * Liste avec interaction CRUD
 */
export interface OnListItemClickAction extends
  OnGrantInit,
  OnLoadDataInit,
  OnSubmitAction,
  OnRefresh,
  OnResetState,
  OnClear {
  onEdit(entity: any): void;
  onDelete(entity: any): void;
}

/**
 * Élément individuel (fiche) avec interaction CRUD
 */
export interface OnItemClickAction extends
  OnGrantInit,
  OnLoadDataInit,
  OnFormGroupInit,
  OnSubmitAction,
  OnResetState,
  OnClear {
  onEdit(entity: any): void;
  onDelete(entity: any): void;
}

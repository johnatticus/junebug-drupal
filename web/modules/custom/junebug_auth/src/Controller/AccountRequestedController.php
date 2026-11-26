<?php

declare(strict_types=1);

namespace Drupal\junebug_auth\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Builds the account-request confirmation page.
 */
final class AccountRequestedController extends ControllerBase {

  /**
   * Returns the confirmation page render array.
   */
  public function build(): array {
    return [
      '#theme' => 'junebug_account_requested',
    ];
  }

}


const locks = new Set<HTMLElement>();

/**
 * Prevents body scrolling. Keeps track of which elements requested a lock so multiple
 * levels of locking are possible without premature unlocking.
 */
export function lockBodyScrolling(lockingEl: HTMLElement) {
  locks.add(lockingEl);
  if (locks.size === 1) {
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';
  }
}

/**
 * Unlocks body scrolling. Scrolling will only be unlocked once all elements
 * that requested a lock call this method.
 */
export function unlockBodyScrolling(lockingEl: HTMLElement) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.documentElement.style.overflow = '';
    document.documentElement.style.scrollbarGutter = '';
  }
}

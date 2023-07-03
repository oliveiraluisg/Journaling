import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  constructor() {}

  typeText(texts: string[], interval: number, callback: (text: string) => void) {
    let index = 0;
    let textIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = texts[textIndex];
      const currentLength = currentText.length;

      if (isDeleting) {
        index--;
      } else {
        index++;
      }

      const typedText = currentText.substr(0, index);
      callback(typedText);

      if (!isDeleting && index === currentLength) {
        setTimeout(() => {
          isDeleting = true;
        }, interval * 3);
      } else if (isDeleting && index === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, isDeleting ? interval / 2 : interval);
    }

    type();
  }
}
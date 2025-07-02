import { Component, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { Gemini } from '../../services/gemini';
import { SharedStateService } from '../../services/shared-state';

@Component({
  selector: 'app-results',
  imports: [MarkdownComponent],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class Results {
  resumeService = inject(SharedStateService);
  geminiService = inject(Gemini);
  rawGeminiResponse: string = this.resumeService.resultText() || ''
//   rawGeminiResponse: string = `## Markdown __rulez__!
// ---

// ### Syntax highlight
// \`\`\`typescript
// const language = 'typescript';
// \`\`\`

// ### Lists
// 1. Ordered list
// 2. Another bullet point
//    - Unordered list
//    - Another unordered bullet

// ### Blockquote
// > Blockquote to the max`


}

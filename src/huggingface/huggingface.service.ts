import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HuggingFaceService {
  private readonly hfToken: string;
  private readonly embeddingUrl: string =
    'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';

  constructor(private readonly configService: ConfigService) {
    this.hfToken = this.configService.get<string>('HF_TOKEN');
    console.log('hfToken: ', this.hfToken);
  }

  async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await fetch(this.embeddingUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Error generating embedding: ${error.message}`);
    }
  }
}

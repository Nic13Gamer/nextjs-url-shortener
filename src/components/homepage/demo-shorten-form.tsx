'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ClipboardPaste, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useFormState, useFormStatus } from 'react-dom';
import { createDemoShortUrl } from '@/actions';
import { toast } from 'sonner';

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Shorten it!
    </Button>
  );
}

export default function DemoShortenForm() {
  const [input, setInput] = useState('');
  const [state, formAction] = useFormState<any, FormData>(
    createDemoShortUrl,
    initialState
  );

  useEffect(() => {
    const message = state.message;

    if (message) toast.error(message);
  }, [state]);

  return (
    <form
      action={formAction}
      className="border-2 rounded-md p-2 flex flex-col gap-2"
    >
      <h1 className="text-3xl text-center font-semibold">Try it</h1>

      <div className="flex gap-1">
        <div className="flex gap-2 w-full items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={async () =>
                    setInput(await navigator.clipboard.readText())
                  }
                >
                  <ClipboardPaste />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Paste URL from clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Input
            name="url"
            type="url"
            placeholder="https://example.com"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <SubmitButton />
      </div>

      <p className="text-foreground/75 text-sm">
        The created URL will only be available for 1 week
      </p>
    </form>
  );
}

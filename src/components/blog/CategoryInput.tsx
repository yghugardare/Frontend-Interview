import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BLOG_CATEGORIES } from '@/constants/blog';
import { useState } from 'react';

export function CategoryInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (categories: string[]) => void;
}) {
  const [input, setInput] = useState('');

  function addCategory(v: string) {
    const cat = v.trim().toUpperCase();
    if (!cat || value.includes(cat)) return;
    onChange([...value, cat]);
    setInput('');
  }

  function removeCategory(cat: string) {
    onChange(value.filter((c) => c !== cat));
  }

  return (
    <div className="space-y-2">
      <Label>Categories</Label>

      <div className="flex flex-wrap gap-2">
        {value.map((cat) => (
          <Badge
            key={cat}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => removeCategory(cat)}
          >
            {cat} ×
          </Badge>
        ))}
      </div>

      <Input
        placeholder="Add category…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addCategory(input);
          }
        }}
      />

      {input && (
        <div className="bg-background rounded-md border shadow-sm">
          {BLOG_CATEGORIES.filter((c) => c.includes(input.toUpperCase()) && !value.includes(c)).map(
            (c) => (
              <div
                key={c}
                className="hover:bg-muted cursor-pointer px-3 py-1 text-sm"
                onClick={() => addCategory(c)}
              >
                {c}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

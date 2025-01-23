import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, Button, Group, NumberInput, Stack } from '@mantine/core';
import { useDisclosure, usePrevious } from '@mantine/hooks';

export function PriceSelector(props: { value: number; onChange: (value: number) => void }) {
  const prices = [1000, 2000, 3000, 6000];
  const [editorOpened, editor] = useDisclosure();

  useEffect(() => {
    if (!prices.includes(props.value)) {
      editor.open();
    }
  }, []);

  return (
    <Stack>
      <Group>
        {prices.map((price) => {
          const active = price === props.value && !editorOpened;
          return (
            <Button
              key={price}
              onClick={() => {
                props.onChange(price);
                if (editorOpened) {
                  editor.close();
                }
              }}
              variant={active ? 'filled' : 'outline'}
            >
              {price}
            </Button>
          );
        })}

        {!editorOpened && (
          <ActionIcon variant="subtle" radius="xl" onClick={editor.open}>
            <IconPlus stroke={1.5} size={16} />
          </ActionIcon>
        )}
      </Group>
      <NumberInputEditor
        editorOpened={editorOpened}
        initialValue={props.value}
        onSave={(value) => {
          if (Number.isNaN(value)) {
            props.onChange(1000);
          } else {
            props.onChange(value);
          }

          const shouldClose = prices.includes(value);

          if (shouldClose) {
            editor.close();
          }
        }}
      />
    </Stack>
  );
}

function NumberInputEditor(props: {
  initialValue: number;
  editorOpened: boolean;
  onSave: (value: number) => void;
}) {
  const [value, onChange] = useState<number>(props.initialValue);
  const previousValue = usePrevious(value);

  const [showSave, setShowSave] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    onChange(props.initialValue);
  }, [props.initialValue]);

  if (!props.editorOpened) {
    return null;
  }

  return (
    <Group gap="xs">
      <NumberInput
        hideControls
        value={value}
        onChange={(value) => {
          if (editing === false) {
            setEditing(true);
          }

          if (value !== previousValue) {
            setShowSave(true);
          }

          if (typeof value === 'string') {
            onChange(parseInt(value, 10));
          } else {
            onChange(value);
          }
        }}
      />
      {showSave && (
        <Button
          onClick={() => {
            setShowSave(false);
            setEditing(false);
            props.onSave(value);
          }}
        >
          儲存
        </Button>
      )}
    </Group>
  );
}

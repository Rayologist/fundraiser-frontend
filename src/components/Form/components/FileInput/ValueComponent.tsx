import { IconFileText, IconPhoto, Icon as TablerIcon } from '@tabler/icons-react';
import { Center, FileInputProps, Group, useMantineColorScheme } from '@mantine/core';

function Value({ file }: { file: File | null }) {
  const { colorScheme } = useMantineColorScheme();
  if (!file) return null;
  let Icon: TablerIcon;

  if (file.type.includes('image')) {
    Icon = IconPhoto;
  } else {
    Icon = IconFileText;
  }

  return (
    <Center
      inline
      style={(theme) => ({
        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
        fontSize: theme.fontSizes.xs,
        padding: '3px 7px',
        borderRadius: theme.radius.sm,
      })}
    >
      <Icon size={14} style={{ marginRight: 5 }} />
      <span
        style={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          maxWidth: 200,
          display: 'inline-block',
        }}
      >
        {file.name}
      </span>
    </Center>
  );
}

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <Group gap="sm" py="xs">
        {value.map((file, index) => (
          <Value file={file} key={index} />
        ))}
      </Group>
    );
  }

  return <Value file={value} />;
};

export default ValueComponent;

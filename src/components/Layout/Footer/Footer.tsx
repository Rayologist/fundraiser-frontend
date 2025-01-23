import cx from 'clsx';
import { Box, Center, Group, RemoveScroll, Stack, Text } from '@mantine/core';
import { PlatformIcon } from '@/components/Icon/Platform/PlatformIcon';
import classes from './Footer.module.css';

const info = {
  電子郵件地址: 'langcutech@gmail.com',
  地址: '臺北市大安區羅斯福路三段29號6樓',
  電話: '(02) 3366-4104 #311',
} as const;

export function Footer() {
  return (
    <footer className={classes.root}>
      <div className={classes.spacer} />
      <Center className={cx(classes.wrapper, RemoveScroll.classNames.fullWidth)}>
        <Stack>
          <Box className={classes.info}>
            <Box>
              <PlatformIcon />
            </Box>
            <Box>
              <Stack gap={0}>
                {Object.entries(info).map(([key, value]) => (
                  <Text key={key} size="sm">
                    {key}：{value}
                  </Text>
                ))}
              </Stack>
            </Box>
          </Box>
          <Text size="xs" c="gray" ta="center">
            Copyright © {new Date().getFullYear()} The Association of Formosan Language Culture and
            Information. All Rights Reserved.
          </Text>
        </Stack>
      </Center>
    </footer>
  );
}

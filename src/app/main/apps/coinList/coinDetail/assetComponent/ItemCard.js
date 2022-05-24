/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
import _ from '@lodash';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });
function ItemCard(props) {
  const theme = useTheme();
  

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-14 pb-8">
        <Typography className="h3 font-medium">{props.title}</Typography>

        <div className="flex flex-col flex-wrap items-center mt-12">
          <Typography className="text-24 font-semibold leading-none tracking-tighter">
            {props?.ss ? props.ss : '$'}
            {props.value < 1000000 && props.value > -1000000
              ? props.value?.toLocaleString()
              : formatter.format(props.value)}
          
          </Typography>

          {props.bottom_value && (
            <div className="flex flex-col mx-8">
              {props.bottom_value > 0 && (
                <Icon className="text-green text-20">trending_up</Icon>
              )}
              {props.bottom_value < 0 && (
                <Icon className="text-red text-20">trending_down</Icon>
              )}
              <div className="flex items-center">
                <Typography className="font-semibold" color="textSecondary">
                  {Math.round(props.bottom_value * 100) / 100}%
                </Typography>
                {props.bottom_desc && (
                  <Typography
                    className="whitespace-nowrap mx-4"
                    color="textSecondary"
                  >
                    {props.bottom_desc}
                  </Typography>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ItemCard;

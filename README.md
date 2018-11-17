# timestamp-group-to-human-readable
Helper function for change timestamp group to human readable

# Example Usage
```
import timestampGroupToHumanReadable from 'timestamp-group-to-human-readable'
timestampGroupToHumanReadable({ timestampGroup: [1542475793000, 1542389393000, 1542043793000] })

// 13,17-18 November 2018
```

# Example Usage Thai Language
```
import timestampGroupToHumanReadable from 'timestamp-group-to-human-readable'
timestampGroupToHumanReadable({ timestampGroup: [1542475793000, 1542389393000, 1542043793000], lang: 'th' })

// 13,17-18 พฤศจิกายน 2561
```
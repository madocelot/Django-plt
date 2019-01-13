from django.http import HttpResponse
import io
import matplotlib.pyplot as plt
#import numpy as np
import pandas as pd
from crt.models import Sale
#hardcoded for now

#linear chart

"""
def setPlt():
    count =  Popul.objects.count()
    x = [Popul.objects.get(id=s).Year for s in range(1,count+1)]
    y = [Popul.objects.get(id=s).Population for s in range(1,count+1)]
    fig, ax = plt.subplots()
    ax.plot(x, y)
    ax.set(xlabel='Year', ylabel='Population',
           title='Population on Andromeda throughout the years')
    ax.grid()
"""

def setPlt():
    q = list(Sale.objects.all().values()) #//TODO query returns worker_id instead of the name, need to fix that
    df = pd.DataFrame(q)
    df.groupby(['year','worker_id'])['revenue'].apply(lambda x : x.sum()).unstack().plot(kind='bar',stacked=True)


    
def pltToSvg():
    buf = io.BytesIO()
    plt.savefig(buf, format='svg', bbox_inches='tight')
    s = buf.getvalue()
    buf.close()
    return s

def get_svg(request):
    setPlt() # create the plot
    svg = pltToSvg() # convert plot to SVG
    plt.cla() # clean up plt so it can be re-used
    response = HttpResponse(svg, content_type='image/svg+xml')
    return response

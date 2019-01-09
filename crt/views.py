from django.http import HttpResponse
import io
import matplotlib.pyplot as plt
import random
import numpy as np
from crt.models import City, Popul

def setPlt():
    count =  Popul.objects.count()
    x = [Popul.objects.get(id=s).Year for s in range(1,count+1)]
    y = [Popul.objects.get(id=s).Population for s in range(1,count+1)]
    fig, ax = plt.subplots()
    ax.plot(x, y)
    ax.set(xlabel='Year', ylabel='Population',
           title='Population on Andromeda throughout the years')
    ax.grid()

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